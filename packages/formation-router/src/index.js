export {createBrowserHistory, createMemoryHistory} from 'history';
export {matchPath, withRouter, useHistory, useLocation, useParams, useRouteMatch} from 'react-router';
export {Link, StaticRouter} from 'react-router-dom';
export {routerMiddleware, push, replace} from 'connected-react-router';
export {default as FormationRouter} from './FormationRouter';
export {default as renderRoutes} from './renderRoutes';
export {default as connectRouter} from './connectRouter';
export {connectedRouterSaga, END_SIDE_EFFECTS_RUNNING} from './connectedRouterSagas';
export {LOCATION_CHANGE, LOCATION_CHANGE_SIDE_EFFECTS_COMPLETED, ROUTE_UNMOUNT_SIDE_EFFECT_COMPLETED, ABANDON_ALL_ROUTE_UNMOUNT_SIDE_EFFECTS} from './actionTypes';
export {default as findMatchingRoutePath} from './findMatchingRoutePath';
export {default as resolveRoute} from './resolveRoute';
export {default as parseSearchQueryParams} from './parseSearchQueryParams';
export {default as prepareSearchQueryParams} from './prepareSearchQueryParams';
export {default as useRouter} from './useRouter';
export {default as useRouterState} from './useRouterState';
export {default as useSearchQueryParams} from './useSearchQueryParams';
export {default as useRouteUnmountEffect} from './useRouteUnmountEffect';

/**
 * Location object definition (react-router, history)
 *
 * @typedef {Object} Location
 * @property {string} key - key is available for all by HashHistory
 * @property {string} pathname - path part of route
 * @property {string} search - search query part of route
 * @property {string} hash - hash (#) part of route
 * @property {Object} state - user defined state for the route
 */

/**
 * ConnectedRoute object definition (react-router-config, connected-react-router, redux-saga)
 *
 * @typedef {Object} ConnectedRoute
 * @property {string} path - any valid URL path that path-to-regexp understands.
 * @property {?Object} component - React component
 * @property {?function} render - render prop function
 * @property {?Location} location - for matching against different location than one in history
 * @property {?boolean} exact - when true, will only match if the path matches the location.pathname exactly
 * @property {?boolean} string - when true, a path that has a trailing slash will only match a location.pathname
 *                      with a trailing slash
 * @property {?boolean} sensitive - when true, will match if the path is case sensitive.
 * @property {?Array<ConnectedRoute>} routes - sub-routes
 * @property {?Array<Array<[saga, Object]>>} locationChangeSideEffects - Redux sagas (side-effects) to be run
 *                                            with payload object
 */
