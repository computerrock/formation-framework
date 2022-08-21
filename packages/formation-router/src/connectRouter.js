import * as actionTypes from './actionTypes';

/**
 * Inject query property into location by transforming location's search property
 */
const injectQuery = location => {
    // don't inject query if it already exists in history
    if (location && location.query) return location;

    const searchQuery = location && typeof location.search === 'string' ? location.search : '?';
    const queryParams = new URLSearchParams(searchQuery);
    const query = {};
    queryParams.forEach((value, key) => {
        query[key] = value;
    });

    return {
        ...location,
        query,
    };
};

/**
 * Creates router reducer
 */
const connectRouter = history => {
    const initialRouterState = {
        location: injectQuery(history.location),
        action: history.action,
        prevLocationKey: null,
        locationSideEffectCounts: {},
    };

    return (state = initialRouterState, action = {}) => {
        switch (action.type) {
            case actionTypes.LOCATION_CHANGE: {
                const {location, action: historyAction, isFirstRendering} = action.payload;
                const {location: prevLocation} = state;

                state = isFirstRendering ? state : {
                    ...state,
                    location: injectQuery(location),
                    action: historyAction,
                    prevLocationKey: prevLocation.key,
                };
                break;
            }

            case actionTypes.SET_ROUTE_UNMOUNT_SIDE_EFFECT_COUNT: {
                const {locationKey, sideEffectCount} = action.payload;

                state = {
                    ...state,
                    locationSideEffectCounts: {
                        ...state.locationSideEffectCounts,
                        [locationKey]: sideEffectCount,
                    },
                };
                break;
            }

            case actionTypes.ALL_ROUTE_UNMOUNT_SIDE_EFFECTS_COMPLETED: {
                const {locationKey} = action.payload;
                const {locationSideEffectCounts} = state;

                if (typeof locationSideEffectCounts[locationKey] !== 'undefined') {
                    delete locationSideEffectCounts[locationKey];
                }

                state = {
                    ...state,
                    locationSideEffectCounts,
                };
                break;
            }

            default:
            // no-op
        }
        return state;
    };
};

export default connectRouter;
