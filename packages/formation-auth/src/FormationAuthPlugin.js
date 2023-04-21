import {all, fork, put, select, call, spawn} from 'redux-saga/effects';
import {replace, END_SIDE_EFFECTS_RUNNING} from '@computerrock/formation-router';
import createAuthReducer from './createAuthReducer';
import createActionTypes from './createActionTypes';
import authSessionFlow from './sagas/authSessionFlow';
import authorize from './sagas/authorize';
import {setNewAuthSessionRoute, getOnceNewAuthSessionRoute} from './sagas/authSessionRouteHandlers';
import signInUserFlow from './sagas/signInUserFlow';
import signOutUserFlow from './sagas/signOutUserFlow';

/**
 * Formation framework auth plugin
 */
class FormationAuthPlugin {
    constructor(params) {
        const {name, authServiceName} = params;

        this.instanceName = name;
        this.reducerName = `${name}Auth`;
        this.actionTypes = createActionTypes(name);
        this.authServiceName = authServiceName;
        this.rootApplicationRoute = params.rootApplicationRoute || '';
        this.authorizeRedirectURI = params.authorizeRedirectURI || '';
        this.authenticateRedirectURI = params.authenticateRedirectURI || '';
    }

    get reducer() {
        return {
            [this.reducerName]: createAuthReducer(this),
        };
    }

    get watcher() {
        const context = this;
        return function* authWatcher() {
            yield all([
                fork([context, signInUserFlow]),
                fork([context, signOutUserFlow]),
            ]);
        };
    }

    get loadAuthSession() {
        const context = this;
        return function* loadAuthSession() {
            const {reducerName, authServiceName, actionTypes} = context;
            const {authenticateRedirectURI} = context;
            const {sessionNotValidSubscribers} = context;
            let {isSessionValid} = yield select(state => state[reducerName]);

            // if isSessionValid is set (boolean), then session is loaded
            if (typeof isSessionValid !== 'boolean') {
                const {serviceManager} = yield select(state => state.application);
                const authService = serviceManager.loadService(authServiceName);
                const sessionCredentials = yield call(authService.restoreSession);
                if (sessionCredentials) {
                    yield put({
                        type: actionTypes.SET_AUTH_SESSION_STATUS,
                        payload: {isSessionValid: true},
                    });
                    yield spawn([context, authSessionFlow], sessionCredentials);
                }
            }

            // access control
            const authPluginState = yield select(state => state[reducerName]);
            isSessionValid = authPluginState.isSessionValid;
            if (!isSessionValid) {
                yield put({
                    type: actionTypes.AUTH_SESSION_NOT_VALID,
                    payload: {isSessionValid},
                });

                sessionNotValidSubscribers.forEach(callback => {
                    if (typeof callback === 'function') callback(isSessionValid);
                });

                const {location} = yield select(state => state.router);
                yield call([context, setNewAuthSessionRoute], {
                    pathname: location.pathname,
                    search: location.search,
                });

                yield call([context, authorize], authenticateRedirectURI);

                return END_SIDE_EFFECTS_RUNNING;
            }
        };
    }

    get authorize() {
        const context = this;
        return function* authorizeLoader() {
            const {reducerName, rootApplicationRoute, authenticateRedirectURI} = context;
            const {isSessionValid} = yield select(state => state[reducerName]);

            // if session is valid, redirect to application root
            if (isSessionValid) {
                yield put(replace(rootApplicationRoute));
            }

            yield call([context, authorize], authenticateRedirectURI);
        };
    }

    get authenticate() {
        const context = this;
        return function* authenticate({payload}) {
            const {reducerName, authServiceName, actionTypes} = context;
            const {rootApplicationRoute, authenticateRedirectURI} = context;
            const {isSessionValid} = yield select(state => state[reducerName]);

            // if session is valid, redirect to application root
            if (isSessionValid) {
                yield put(replace(rootApplicationRoute));
            }

            const {serviceManager} = yield select(state => state.application);
            const authService = serviceManager.loadService(authServiceName);

            const {location} = payload;
            const {code} = location.query;

            const sessionCredentials = yield call(authService.authenticate, {
                code,
                redirectURI: authenticateRedirectURI,
            });
            if (sessionCredentials) {
                yield put({
                    type: actionTypes.SET_AUTH_SESSION_STATUS,
                    payload: {isSessionValid: true},
                });
                const newAuthSessionRouteState = yield call([context, getOnceNewAuthSessionRoute]);
                const newAuthSessionRoute = newAuthSessionRouteState && newAuthSessionRouteState.pathname
                    ? newAuthSessionRouteState.pathname + newAuthSessionRouteState.search : rootApplicationRoute;
                yield put(replace(newAuthSessionRoute));

                yield spawn([context, authSessionFlow], sessionCredentials);
            }
        };
    }

    get signInUserAction() {
        return {
            type: this.actionTypes.SIGN_IN_USER,
            payload: {},
        };
    }

    get signOutUserAction() {
        return {
            type: this.actionTypes.SIGN_OUT_USER,
            payload: {},
        };
    }

    sessionStartSubscribers = [];
    sessionEndSubscribers = [];
    sessionNotValidSubscribers = [];

    onAuthSessionStarted = callback => {
        const subscriberIndex = this.sessionStartSubscribers.push(callback) - 1;
        return () => {
            this.sessionStartSubscribers.splice(subscriberIndex, 1);
        };
    };

    onAuthSessionEnded = callback => {
        const subscriberIndex = this.sessionEndSubscribers.push(callback) - 1;
        return () => {
            this.sessionEndSubscribers.splice(subscriberIndex, 1);
        };
    };

    onAuthSessionNotValid = callback => {
        const subscriberIndex = this.sessionNotValidSubscribers.push(callback) - 1;
        return () => {
            this.sessionNotValidSubscribers.splice(subscriberIndex, 1);
        };
    };
}

export default FormationAuthPlugin;
