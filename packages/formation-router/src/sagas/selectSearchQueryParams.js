import {select} from 'redux-saga/effects';
import parseSearchQueryParams from '../parseSearchQueryParams';

/**
 * Redux-saga for selecting search query params into key:value pairs
 */
const selectSearchQueryParams = function* selectSearchQueryParams() {
    const {location} = yield select(state => state.router);

    return parseSearchQueryParams(location.search);
};

export default selectSearchQueryParams;
