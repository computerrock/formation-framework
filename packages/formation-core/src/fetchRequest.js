import {call, put} from 'redux-saga/effects';

/**
 * Fetch request saga
 *
 * @param {string} actionType
 * @param {function} serviceMethod
 * @param {Object} requestParams
 * @param {Object} meta
 */
const fetchRequest = function* fetchRequest(actionType, serviceMethod, requestParams, meta) {
    // ensure actionType contains `_REQUEST` postfix
    actionType = !actionType.includes('_REQUEST') ? `${actionType}_REQUEST` : actionType;

    try {
        yield put({
            type: `${actionType}_SENT`,
            payload: {requestParams},
            meta,
        });

        const response = yield call(serviceMethod, requestParams);
        yield put({
            type: `${actionType}_SUCCEEDED`,
            payload: {response},
            meta,
        });
    } catch (error) {
        yield put({type: `${actionType}_FAILED`, error: true, payload: error, meta});
    }
};

export default fetchRequest;
