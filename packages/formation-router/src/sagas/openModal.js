import {select, put} from 'redux-saga/effects';
import {replace} from 'connected-react-router';
import parseSearchQueryParams from '../parseSearchQueryParams';
import prepareSearchQueryParams from '../prepareSearchQueryParams';

/**
 * Opens modal
 */
const openModal = function* openModal(modalId, additionalQueryParams = {}) {
    const {location} = yield select(state => state.router);
    let {modal: activeModalIds = []} = parseSearchQueryParams(location.search);
    activeModalIds = Array.isArray(activeModalIds) ? activeModalIds : [activeModalIds];

    // add active modalId
    activeModalIds.push(modalId);
    yield put(replace({
        pathname: location.pathname,
        search: prepareSearchQueryParams({
            modal: activeModalIds,
            ...additionalQueryParams,
        }, location.search, true),
    }));
};

export default openModal;
