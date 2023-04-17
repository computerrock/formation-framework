import cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import * as oidcAPIResourceMethods from './resourceMethods';

/**
 * Injects service parameters into API resource method
 */
const injectServiceParameters = (apiResourceMethod, serviceParameters) => params => apiResourceMethod({
    ...serviceParameters,
    ...params,
});

/**
 * OpenID Connect client
 */
export default class OpenIDConnectClient {
    /**
     * @param {Object} serviceParameters
     * @returns {Object}
     */
    constructor(serviceParameters = {}) {
        this.serviceParameters = {
            authServiceId: 'auth_service',
            domain: undefined,
            ...serviceParameters,
        };

        /**
         * @type {Object}
         * @property {function} getAccessToken
         * @property {function} refreshAccessToken
         * @property {function} getSessionInfo
         */
        this.resources = [
            oidcAPIResourceMethods,
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
        const resourceEndpoint = `${params.serviceURL}/realms/${params.realm}/protocol/openid-connect/auth`;

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
        const resourceEndpoint = `${params.serviceURL}/realms/${params.realm}/protocol/openid-connect/logout`;

        const queryParams = new URLSearchParams();
        queryParams.append('client_id', params.clientId);
        queryParams.append('post_logout_redirect_uri', params.redirectURI);
        const {idTokenHint} = this.sessionCredentials;
        if (idTokenHint) queryParams.append('id_token_hint', idTokenHint);
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
                    refresh_expires_in: refreshExpiresIn,
                    id_token: idTokenHint,
                } = response;
                const {sub: sessionId} = jwtDecode(accessToken) || {};

                const sessionCredentials = {sessionId, accessToken, accessExpiresIn, refreshToken, refreshExpiresIn, idTokenHint};
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
        const previousSession = this.loadOIDCSessionCredentials();
        if (!previousSession) return null;

        const jwt = jwtDecode(previousSession.accessToken);
        if (Math.floor(Date.now() / 1000) > jwt.exp) {
            this.storeOIDCSessionCredentials(null);
            return null;
        }

        const {refreshToken, refreshExpiresIn = 0} = previousSession;
        if (Math.floor(Date.now() / 1000) > jwt.exp + refreshExpiresIn) {
            this.storeOIDCSessionCredentials(null);
            return null;
        }

        // try token refresh to get fresh session then return accessToken
        const sessionCredentials = await this.refreshSessionToken(refreshToken);
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

        this.storeOIDCSessionCredentials(null);
        this.sessionCredentials = null;
        this.session = null;
    };

    /**
     * Returns OIDC session info
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
        this.storeOIDCSessionCredentials(this.sessionCredentials);

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
            this.sessionCredentials = await this.refreshSessionToken(refreshToken);
            this.storeOIDCSessionCredentials(this.sessionCredentials);

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
                    refresh_expires_in: refreshExpiresIn,
                } = response;
                const {sub: sessionId} = jwtDecode(accessToken) || {};

                if (accessExpiresIn < 60) {
                    throw new Error('session expired');
                }

                return {sessionId, accessToken, accessExpiresIn, refreshToken, refreshExpiresIn};
            })
            .catch(() => {
                this.triggerSessionUpdated(this.SESSION_EXPIRED);
                return null;
            });
    };

    /**
     * @private
     */
    loadOIDCSessionCredentials = () => {
        const {authServiceId, cookieDomain} = this.serviceParameters;
        const storedSession = cookie.get(`${authServiceId}_oidc_session`);
        if (!storedSession) {
            cookie.set(`${authServiceId}_oidc_session`, JSON.stringify(null), {
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
    storeOIDCSessionCredentials = (session = null) => {
        const {authServiceId, cookieDomain} = this.serviceParameters;
        cookie.set(`${authServiceId}_oidc_session`, JSON.stringify(session), {
            ...(cookieDomain && {domain: cookieDomain}),
        });
    };
}
