import {takeLatest, select, all, call, put, take} from 'redux-saga/effects';
import {matchRoutes} from 'react-router-config';
import * as actionTypes from './actionTypes';

/**
 * Side effects running END signal
 *
 * @type {string}
 */
export const END_SIDE_EFFECTS_RUNNING = 'END_SIDE_EFFECTS_RUNNING';

/**
 * Returns sagas defined in static routes config for given pathname
 *
 * @param {string} location - router location object
 * @param {Array<Object>} routeBranch
 * @returns {Array<Array<[saga, arguments]>>}
 */
const getBranchSagas = (routeBranch, location) => {
    const branchSagas = [];
    routeBranch
        .filter(branchItem => typeof branchItem.route.locationChangeSideEffects !== 'undefined'
            && Array.isArray(branchItem.route.locationChangeSideEffects))
        .forEach(branchItem => {
            const {route, match} = branchItem;
            const branchItemSideEffect = [];
            route.locationChangeSideEffects.forEach(sideEffect => {
                branchItemSideEffect.push([
                    sideEffect[0],
                    {
                        type: actionTypes.LOCATION_CHANGE_SIDE_EFFECT,
                        payload: {
                            ...sideEffect[1],
                            match,
                            location,
                        },
                    },
                ]);
            });

            branchSagas.push(branchItemSideEffect);
        });

    return branchSagas.reverse();
};

/**
 * Runs branch sagas by running deepest route sagas in each recursion step
 *
 * @param branchSagas
 * @return {IterableIterator<*>}
 */
const runBranchSagas = function* runBranchSagas(branchSagas) {
    const {serviceManager} = yield select(state => state.application);
    const ffwLoggerService = serviceManager.loadService('ffwLoggerService');

    const subBranchSagas = [...branchSagas];
    const branchRouteSagas = subBranchSagas.pop().reverse();

    let shouldContinueRunning;
    while (branchRouteSagas.length > 0) {
        try {
            const [saga, ...args] = branchRouteSagas.pop();
            shouldContinueRunning = yield call(saga, ...args);
        } catch (error) {
            ffwLoggerService.error('Loader saga error: ' + error.message, {error});
            ffwLoggerService.consoleError('Loader saga error: ' + error.message, error);
        }

        if (shouldContinueRunning === END_SIDE_EFFECTS_RUNNING) break;
    }

    if (subBranchSagas.length > 0 && shouldContinueRunning !== END_SIDE_EFFECTS_RUNNING) {
        shouldContinueRunning = yield* runBranchSagas(subBranchSagas);
    }

    return shouldContinueRunning;
};

/**
 * Prepares application state for matched route by running configured side-effects of a route
 *
 * @param {Array<ConnectedRoute>} routes - static route configuration
 */
const prepareRouteState = function* prepareRouteState(routes) {
    const routerState = yield select(state => state.router);
    const {location, prevLocationKey, locationSideEffectCounts} = routerState;
    const matchedRouteBranch = matchRoutes(routes, location.pathname);
    const branchSagas = getBranchSagas(matchedRouteBranch, location);

    // wait for route unmount side-effect sagas end-signals
    const prevLocationSideEffectCount = locationSideEffectCounts[prevLocationKey];
    if (prevLocationSideEffectCount && prevLocationSideEffectCount > 0) {
        let completedRouteUnmountSideEffects = 0;
        while (completedRouteUnmountSideEffects < prevLocationSideEffectCount) {
            const routeUnmountSideEffectAction = yield take([
                actionTypes.ROUTE_UNMOUNT_SIDE_EFFECT_COMPLETED,
                actionTypes.ABANDON_ALL_ROUTE_UNMOUNT_SIDE_EFFECTS,
            ]);

            if (routeUnmountSideEffectAction.type === actionTypes.ABANDON_ALL_ROUTE_UNMOUNT_SIDE_EFFECTS) break;

            completedRouteUnmountSideEffects += 1;
        }

        yield put({
            type: actionTypes.ALL_ROUTE_UNMOUNT_SIDE_EFFECTS_COMPLETED,
            payload: {locationKey: prevLocationKey},
        });
    }

    // run branch sagas
    const sideEffectsRunningAborted = yield* runBranchSagas(branchSagas);

    // signal location change side-effects completed
    if (!sideEffectsRunningAborted) {
        yield put({
            type: actionTypes.LOCATION_CHANGE_SIDE_EFFECTS_COMPLETED,
            payload: {},
        });
    }
};

/**
 * Initializes application state for matched starting route by running configured side-effects
 * then runs connectedRoute watcher for future route changes
 *
 * @param {Array<ConnectedRoute>} routes - static route configuration
 */
export const connectedRouterSaga = function* connectedRouterSaga(routes) {
    yield all([
        takeLatest(actionTypes.LOCATION_CHANGE, prepareRouteState, routes),
    ]);
};
