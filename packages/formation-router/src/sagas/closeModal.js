import {select, put} from 'redux-saga/effects';
import {replace} from 'connected-react-router';
import parseSearchQueryParams from '../parseSearchQueryParams';
import prepareSearchQueryParams from '../prepareSearchQueryParams';
import removeSearchQueryParams from '../removeSearchQueryParams';

/**
 * Closes modal
 */
const closeModal = function* closeModal(modalId, additionalQueryParams = {}) {
    const {location} = yield select(state => state.router);
    let {modal: activeModalIds = []} = parseSearchQueryParams(location.search);
    activeModalIds = Array.isArray(activeModalIds) ? activeModalIds : [activeModalIds];

    const newLocation = additionalQueryParams && Object.keys(additionalQueryParams).length > 0
        ? removeSearchQueryParams(location.search, Object.keys(additionalQueryParams))
        : location.search;

    // remove active modalId
    const modalIndex = activeModalIds.findIndex(activeModalId => activeModalId === modalId);
    if (modalIndex !== -1) activeModalIds.splice(modalIndex, 1);
    yield put(replace({
        pathname: location.pathname,
        search: prepareSearchQueryParams({
            modal: activeModalIds,
        }, newLocation, true),
    }));
};

export default closeModal;
