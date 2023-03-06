import {select, put} from 'redux-saga/effects';
import {push, goBack as routerGoBack} from 'connected-react-router';
import resolveRoute from '../resolveRoute';

/**
 * Goes back in history
 */
const goBack = function* goBack(defaultRoutePath) {
    const {prevLocationKey} = yield select(state => state.router);

    if (!prevLocationKey) {
        yield put(push(resolveRoute(defaultRoutePath)));
        return;
    }
    yield put(routerGoBack());
};

export default goBack;
