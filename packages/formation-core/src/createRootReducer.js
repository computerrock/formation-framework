import {combineReducers} from 'redux';
import {enableMapSet} from 'immer';
import {connectRouter} from '@computerrock/formation-router';

// Enable immutable Maps & Sets
enableMapSet();

// combine application reducers
const createRootReducer = (history, reducers = {}) => combineReducers({
    router: connectRouter(history),
    ...reducers,
});

export default createRootReducer;
