import {call, put, race, select, take, spawn} from 'redux-saga/effects';
import {setNewAuthSessionRoute} from './authSessionRouteHandlers';
import endAuthSession from './endAuthSession';

const authSessionFlow = function* authSessionFlow(sessionCredentials) {
    const {authServiceName, actionTypes, authorizeRedirectURI} = this;
    const {sessionStartSubscribers, sessionEndSubscribers} = this;
    const {serviceManager} = yield select(state => state.application);
    const authService = serviceManager.loadService(authServiceName);

    yield put({
        type: actionTypes.AUTH_SESSION_STARTED,
        payload: {sessionCredentials},
    });

    sessionStartSubscribers.forEach(callback => {
        if (typeof callback === 'function') callback(sessionCredentials);
    });

    const {sessionUpdatedResult, endAuthSessionAction, authSessionRestarted} = yield race({
        sessionUpdatedResult: call(authService.sessionUpdated),
        endAuthSessionAction: take(actionTypes.END_AUTH_SESSION),
        authSessionRestarted: take(actionTypes.AUTH_SESSION_STARTED),
    });

    if (authSessionRestarted) {
        return;
    }

    if (sessionUpdatedResult && sessionUpdatedResult !== authService.SESSION_EXPIRED) {
        yield spawn([this, authSessionFlow], sessionUpdatedResult);
        return;
    }

    yield put({type: actionTypes.AUTH_SESSION_ENDED, payload: {}});
    yield put({
        type: actionTypes.SET_AUTH_SESSION_STATUS,
        payload: {isSessionValid: false},
    });

    sessionEndSubscribers.forEach(callback => {
        if (typeof callback === 'function') callback();
    });

    if (endAuthSessionAction) {
        yield call(authService.revokeSession);
        return;
    }

    if (sessionUpdatedResult === authService.SESSION_EXPIRED) {
        // redirect to OIDC authorization page
        const {location} = yield select(state => state.router);
        yield call([this, setNewAuthSessionRoute], location.pathname);

        yield call([this, endAuthSession], authorizeRedirectURI);
    }
};

export default authSessionFlow;
