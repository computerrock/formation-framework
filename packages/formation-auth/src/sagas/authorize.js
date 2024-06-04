import {call, select} from 'redux-saga/effects';

/**
 * Authorize
 *
 * @param {string|URL} redirectURI
 */
const authorize = function* authorize(redirectURI) {
    const {authServiceName} = this;
    const {serviceManager} = yield select(state => state.application);
    const authService = serviceManager.loadService(authServiceName);
    const authorizationEndpoint = authService.getAuthorizationEndpoint({responseType: 'code', redirectURI, scope: 'openid profile email phone'});
    yield call(() => window.location.assign(authorizationEndpoint));
};

export default authorize;
