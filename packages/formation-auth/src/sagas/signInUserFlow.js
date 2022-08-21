import {take, call, select} from 'redux-saga/effects';
import {setNewAuthSessionRoute} from './authSessionRouteHandlers';
import authorize from './authorize';

/**
 * Sign-in user flow
 */
const signInUserFlow = function* signInUserFlow() {
    const {actionTypes, authenticateRedirectURI} = this;

    while (true) {
        yield take(actionTypes.SIGN_IN_USER);

        const {location} = yield select(state => state.router);
        yield call([this, setNewAuthSessionRoute], location.pathname);

        yield call([this, authorize], authenticateRedirectURI);
    }
};

export default signInUserFlow;
