import cookie from 'js-cookie';
import * as oauth2APIResourceMethods from './resourceMethods';

/**
 * Injects service parameters into API resource method
 */
const injectServiceParameters = (apiResourceMethod, serviceParameters) => params => apiResourceMethod({
    ...serviceParameters,
    ...params,
});

/**
 * OAuth2 client
 */
export default class OAuth2Client {
    /**
     * @param {Object} serviceParameters
     * @returns {Object}
     */
    constructor(serviceParameters = {}) {
        this.serviceParameters = {
            authServiceId: 'auth_service',
            cookieDomain: undefined,
            serviceSignOutEndpoint: '/signout', // for the services that implement different endpoint format
            ...serviceParameters,
        };

        /**
         * @type {Object}
         * @property {function} getAccessToken
         * @property {function} refreshAccessToken
         * @property {function} getSessionInfo
         */
        this.resources = [
            oauth2APIResourceMethods,
        ].reduce((resources, apiResourceMethods) => {
            const apiResources = Object.keys(apiResourceMethods).reduce((apiResources, methodKey) => {
                apiResources[methodKey] = injectServiceParameters(
                    apiResourceMethods[methodKey],
                    {
                        ...serviceParameters,
                    },
                );
                return apiResources;
            }, {});

            return {
                ...resources,
                ...apiResources,
            };
        }, {});

        return {
            getAuthorizationEndpoint: this.getAuthorizationEndpoint,
            getEndSessionEndpoint: this.getEndSessionEndpoint,
            authenticate: this.authenticate,
            restoreSession: this.restoreSession,
            sessionUpdated: this.sessionUpdated,
            revokeSession: this.revokeSession,
            getSessionInfo: this.getSessionInfo,
            SESSION_EXPIRED: this.SESSION_EXPIRED,
        };
    }

    /**
     * @public
     */
    SESSION_EXPIRED = 'SESSION_EXPIRED';

    /**
     * @private
     */
    sessionCredentials = null;

    /**
     * @private
     */
    tokenRefreshTimeout = null;

    /**
     * @private
     */
    session = null;

    /**
     * @private
     */
    triggerSessionUpdated = () => undefined;

    /**
     * Returns authorization endpoint
     *
     * @public
     * @param params
     * @returns {string}
     */
    getAuthorizationEndpoint = params => {
        params = {...params, ...this.serviceParameters};
        const resourceEndpoint = `${params.serviceURL}/authorize`;

        const queryParams = new URLSearchParams();
        queryParams.append('client_id', params.clientId);
        queryParams.append('response_type', params.responseType);
        queryParams.append('redirect_uri', params.redirectURI);
        if (params.scope) queryParams.append('scope', params.scope);
        if (params.state) queryParams.append('state', params.state);
        const queryParamsString = queryParams.toString();

        return `${resourceEndpoint}?${queryParamsString}`;
    };

    /**
     * Returns end session endpoint
     *
     * @public
     * @param params
     * @returns {string}
     */
    getEndSessionEndpoint = params => {
        params = {...params, ...this.serviceParameters};
        const resourceEndpoint = `${params.serviceURL}${params.serviceSignOutEndpoint}`;

        const queryParams = new URLSearchParams();
        queryParams.append('client_id', params.clientId);
        queryParams.append('redirect_uri', params.redirectURI);
        const queryParamsString = queryParams.toString();

        return `${resourceEndpoint}?${queryParamsString}`;
    };

    /**
     * Authenticate and start new session
     *
     * @public
     * @param params
     */
    authenticate = params => {
        const resources = this.resources;
        const {code, redirectURI} = params;

        return resources.getAccessToken({code, redirectURI})
            .then(response => {
                const {
                    access_token: accessToken,
                    expires_in: accessExpiresIn,
                    refresh_token: refreshToken,
                    refresh_token_expires_in: refreshExpiresIn,
                    username: sessionId,
                } = response;

                const sessionCredentials = {
                    sessionId,
                    accessToken,
                    accessExpiresIn,
                    refreshToken,
                    refreshExpiresIn,
                    refreshTokenExpiresAt: Math.floor(Date.now() / 1000) + refreshExpiresIn,
                };
                this.startSession(sessionCredentials);

                return sessionCredentials;
            });
    };

    /**
     * Restore session from local storage
     *
     * @public
     */
    restoreSession = async () => {
        const previousSession = this.loadOAuth2SessionCredentials();
        if (!previousSession) return null;

        const {refreshToken, refreshTokenExpiresAt} = previousSession;
        if (Math.floor(Date.now() / 1000) > refreshTokenExpiresAt) {
            this.storeOauth2SessionCredentials(null);
            return null;
        }

        // try token refresh to get fresh session then return accessToken
        const sessionRefreshCredentials = await this.refreshSessionToken(refreshToken);
        const sessionCredentials = {
            ...previousSession,
            ...sessionRefreshCredentials,
        };
        this.startSession(sessionCredentials);

        return sessionCredentials;
    };

    /**
     * @public
     */
    sessionUpdated = () => {
        return this.session;
    };

    /**
     * Revoke session
     *
     * @public
     */
    revokeSession = () => {
        clearTimeout(this.tokenRefreshTimeout);
        this.tokenRefreshTimeout = null;

        this.storeOauth2SessionCredentials(null);
        this.sessionCredentials = null;
        this.session = null;
    };

    /**
     * Returns OAuth2 session info
     *
     * @public
     */
    getSessionInfo = () => {
        const resources = this.resources;
        const {accessToken} = this.sessionCredentials;

        return resources.getSessionInfo({accessToken});
    };

    /**
     * @private
     * @param sessionCredentials
     */
    startSession = sessionCredentials => {
        this.sessionCredentials = sessionCredentials;
        this.storeOauth2SessionCredentials(this.sessionCredentials);

        // start token refresh timeout
        this.startTokenRefreshTimeout();
    };

    /**
     * @private
     */
    startTokenRefreshTimeout = () => {
        if (!this.sessionCredentials) return;

        const {accessExpiresIn, refreshToken} = this.sessionCredentials;
        clearTimeout(this.tokenRefreshTimeout);

        this.session = new Promise(resolve => {
            this.triggerSessionUpdated = sessionUpdateResult => {
                resolve(sessionUpdateResult);
            };
        });

        this.tokenRefreshTimeout = setTimeout(async () => {
            const sessionRefreshCredentials = await this.refreshSessionToken(refreshToken);
            this.sessionCredentials = {
                ...this.sessionCredentials,
                ...sessionRefreshCredentials,
            };
            this.storeOauth2SessionCredentials(this.sessionCredentials);

            if (this.sessionCredentials) {
                this.triggerSessionUpdated(this.sessionCredentials);
                this.startTokenRefreshTimeout();
            }
        }, (accessExpiresIn - 5) * 1000);
    };

    /**
     * @private
     * @param refreshToken
     * @returns sessionCredentials
     */
    refreshSessionToken = refreshToken => {
        const resources = this.resources;

        return resources.refreshAccessToken({refreshToken})
            .then(response => {
                const {
                    access_token: accessToken,
                    expires_in: accessExpiresIn,
                    refresh_token: refreshToken,
                    refresh_token_expires_in: refreshExpiresIn,
                    username: sessionId,
                } = response;

                if (!accessToken) {
                    this.triggerSessionUpdated(this.SESSION_EXPIRED);
                    return null;
                }

                if (accessExpiresIn < 60) {
                    throw new Error('session expired');
                }

                return {
                    sessionId,
                    accessToken,
                    accessExpiresIn,
                    // The authorization server MAY issue a new refresh token, in which case the client MUST
                    // discard the old refresh token and replace it with the new refresh token.
                    ...(typeof refreshToken !== 'undefined' && {
                        refreshToken,
                        refreshExpiresIn,
                        refreshTokenExpiresAt: Math.floor(Date.now() / 1000) + refreshExpiresIn,
                    }),
                };
            })
            .catch(() => {
                this.triggerSessionUpdated(this.SESSION_EXPIRED);
                return null;
            });
    };

    /**
     * @private
     */
    loadOAuth2SessionCredentials = () => {
        const {authServiceId, cookieDomain} = this.serviceParameters;
        const storedSession = cookie.get(`${authServiceId}_oauth2_session`);
        if (!storedSession) {
            cookie.set(`${authServiceId}_oauth2_session`, JSON.stringify(null), {
                ...(cookieDomain && {domain: cookieDomain}),
            });
            return null;
        }

        try {
            return JSON.parse(storedSession);
        } catch (error) {
            return null;
        }
    };

    /**
     * @private
     * @param session
     */
    storeOauth2SessionCredentials = (session = null) => {
        const {authServiceId, cookieDomain} = this.serviceParameters;
        cookie.set(`${authServiceId}_oauth2_session`, JSON.stringify(session), {
            ...(cookieDomain && {domain: cookieDomain}),
        });
    };
}
