import {call, select, put} from 'redux-saga/effects';

/**
 * End auth session
 *
 * @param {string|URL} redirectURI
 */
const endAuthSession = function* endAuthSession(redirectURI) {
    const {authServiceName, actionTypes} = this;
    const {serviceManager} = yield select(state => state.application);
    const authService = serviceManager.loadService(authServiceName);

    yield put({type: actionTypes.END_AUTH_SESSION, payload: {}});

    const endSessionEndpoint = authService.getEndSessionEndpoint({redirectURI});
    yield call(() => window.location.assign(endSessionEndpoint));
};

export default endAuthSession;
