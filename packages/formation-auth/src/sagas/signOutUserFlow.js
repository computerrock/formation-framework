import {take, call} from 'redux-saga/effects';
import endAuthSession from './endAuthSession';

/**
 * Sign out user flow
 */
const signOutUserFlow = function* signOutUserFlow() {
    const {actionTypes, authorizeRedirectURI} = this;

    while (true) {
        yield take(actionTypes.SIGN_OUT_USER);
        yield call([this, endAuthSession], authorizeRedirectURI);
    }
};

export default signOutUserFlow;
