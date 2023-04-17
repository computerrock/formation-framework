import qs from 'qs';
import handleResponse from './handleResponse';

/**
 * Get access token
 */
export const getAccessToken = function getAccessToken(params) {
    const formData = {
        'grant_type': 'authorization_code',
        'code': params.code,
        'redirect_uri': params.redirectURI,
        'client_id': params.clientId,
        'scope': params.scope,
    };

    return fetch(
        `${params.serviceURL}/token`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: qs.stringify(formData),
        },
    )
        .then(handleResponse);
};

/**
 * Refresh access token
 */
export const refreshAccessToken = function refreshAccessToken(params) {
    const formData = {
        'grant_type': 'refresh_token',
        'refresh_token': params.refreshToken,
        'redirect_uri': params.redirectURI,
        'client_id': params.clientId,
    };

    return fetch(
        `${params.serviceURL}/token`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: qs.stringify(formData),
        },
    )
        .then(handleResponse);
};

/**
 * Get session info
 */
export const getSessionInfo = function getSessionInfo(params) {
    return fetch(
        `${params.serviceURL}/userinfo`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${params.accessToken}`,
            },
            method: 'GET',
        },
    )
        .then(handleResponse);
};
