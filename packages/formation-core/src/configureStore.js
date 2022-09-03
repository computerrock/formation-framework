import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'flux-standard-action';
import {routerMiddleware} from '@computerrock/formation-router';
import createRootReducer from './createRootReducer';

/**
 * Creates Redux store from seed state and root reducer.
 * Then configures it by applying middleware and attaching helper methods
 *
 * @param {Object} config
 * @param {Object} config.history
 * @param {Object} config.reducers
 * @param {Object} config.initialState
 * @returns {Object}
 */
export default function configureStore(config) {
    const {history, reducers, initialState} = config;

    const sagaMiddleware = createSagaMiddleware();
    let middleware = [
        routerMiddleware(history),
        sagaMiddleware,
    ];

    // if in development and in browser log redux actions
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        middleware = [...middleware, createLogger()];
    }

    // if in development and in browser log redux actions
    if (process.env.DEBUG_STORE_SURVEY_DATA_ACTION
        && process.env.NODE_ENV !== 'development'
        && typeof window !== 'undefined') {
        middleware = [...middleware, createLogger({
            predicate: (getState, action) => action.type === process.env.DEBUG_STORE_SURVEY_DATA_ACTION,
        })];
    }

    const store = createStore(
        createRootReducer(history, reducers),
        initialState,
        composeWithDevTools(
            applyMiddleware(...middleware),
        ),
    );

    // store helper methods
    store.runSaga = sagaMiddleware.run;
    store.hotReloadReducers = reducers => store.replaceReducer(createRootReducer(history, reducers));
    store.close = () => store.dispatch(END);
    return store;
}
