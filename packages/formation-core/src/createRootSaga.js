import {all, call} from 'redux-saga/effects';
import {connectedRouterSaga} from '@computerrock/formation-router';

/**
 * Creates root redux saga
 */
const createRootSaga = (sagas = [], routes = []) => {
    let applicationSagas = sagas;
    if (!Array.isArray(sagas) && typeof sagas === 'function') {
        applicationSagas = [sagas];
    } else if (!Array.isArray(sagas)) {
        applicationSagas = [];
    }

    return function* rootSaga() {
        yield all([
            ...applicationSagas,

            // connected router saga should be last in sequence!
            call(connectedRouterSaga, routes),
        ]);
    };
};

export default createRootSaga;
