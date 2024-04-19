import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'flux-standard-action';
import {routerMiddleware} from '@computerrock/formation-router';
import createRootReducer from './createRootReducer';
import createRootSaga from './createRootSaga';
import ServiceManager from './ServiceManager';

/**
 * Creates Redux store from seed state and root reducer.
 * Then configures it by applying middleware and attaching helper methods
 *
 * @param {Object} config
 * @param {Array<Object>} config.routes
 * @param {Object} config.history
 * @param {Object} config.reducers
 * @param {ServiceManager} config.serviceManager
 * @param {?Object} config.initialState
 * @returns {Object}
 */
export default function configureStore(config) {
    const {routes, history, reducers, serviceManager, initialState} = config;

    let logger;
    try {
        logger = serviceManager.loadService('ffwLoggerService');
    } catch (error) {
        // no-op
    }

    const sagaMiddleware = createSagaMiddleware({
        ...(!!logger && {onError: (error, sagaContext) => {
            logger.error(error.message
                + (sagaContext.sagaStack ? '\n' + sagaContext.sagaStack : ''), {error, ...sagaContext});
            logger.consoleError('Uncaught redux-saga error: ' + error.message, error);
            logger.consoleError(`${sagaContext.sagaStack || 'No saga stack available'}`);
        }}),
    });
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
        // initialState
        {
            ...(initialState || {}),
            application: {
                ...(initialState && typeof initialState.application === 'object' ? initialState.application : {}),
                serviceManager: typeof serviceManager === 'object' ? serviceManager : new ServiceManager(),
            },
        },
        // in order to avoid crashing issue when there is no redux-devtools-extension installed in browser
        /* eslint-disable-next-line no-underscore-dangle */
        typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? composeWithDevTools(
                applyMiddleware(...middleware),
            ) : applyMiddleware(...middleware),
    );

    // store helper methods
    store.runSagas = sagas => {
        const rootSaga = createRootSaga(sagas, routes);
        return sagaMiddleware.run(rootSaga);
    };
    store.hotReloadReducers = reducers => store.replaceReducer(createRootReducer(history, reducers));
    store.close = () => store.dispatch(END);
    return store;
}
