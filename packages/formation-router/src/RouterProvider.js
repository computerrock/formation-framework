import React, {Fragment, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {matchRoutes} from 'react-router-config';
import {useHistory} from 'react-router';
import * as actionTypes from './actionTypes';
import resolveRoute from './resolveRoute';
import findMatchingRoutePath from './findMatchingRoutePath';
import renderModals from './renderModals';
import prepareSearchQueryParams from './prepareSearchQueryParams';
import parseSearchQueryParams from './parseSearchQueryParams';
import RouterContext from './RouterContext';
import RouterStateContext from './RouterStateContext';
import removeSearchQueryParams from './removeSearchQueryParams';


/**
 * Provides router context for side-effects & navigation UI features (Tabs, Modals, etc..)
 */
const RouterProvider = props => {
    const history = useHistory();
    const sideEffectsRef = useRef({});
    const locationSideEffectsRef = useRef({});
    const {location, prevLocationKey} = props;
    const {setRouteUnmountSideEffectCount, completeRouteUnmountSideEffect, render} = props;
    const {children, modals, routes, routePaths, defaultRoutePath} = props;
    const matchedRouteBranch = matchRoutes(routes, location.pathname);

    const {match} = matchedRouteBranch.length > 0
        ? matchedRouteBranch[matchedRouteBranch.length - 1] : {};
    const activeRoutePath = findMatchingRoutePath(Object.values(routePaths), location.pathname);

    const goBack = () => {
        if (history.length === 1) {
            history.push(resolveRoute(defaultRoutePath));
            return;
        }
        history.goBack();
    };

    const openModal = useCallback((modalId, additionalQueryParams = {}) => {
        let {modal: activeModalIds = []} = parseSearchQueryParams(location.search);
        activeModalIds = Array.isArray(activeModalIds) ? activeModalIds : [activeModalIds];

        // add active modalId
        activeModalIds.push(modalId);
        history.replace({
            pathname: location.pathname,
            search: prepareSearchQueryParams({
                modal: activeModalIds,
                ...additionalQueryParams,
            }, location.search, true),
        });
    }, [location.search, location.pathname, history]);

    const closeModal = useCallback((modalId, additionalQueryParams = {}) => {
        let {modal: activeModalIds = []} = parseSearchQueryParams(location.search);
        activeModalIds = Array.isArray(activeModalIds) ? activeModalIds : [activeModalIds];
        const newLocation = additionalQueryParams && Object.keys(additionalQueryParams).length > 0
            ? removeSearchQueryParams(location.search, Object.keys(additionalQueryParams))
            : location.search;

        // remove active modalId
        const modalIndex = activeModalIds.findIndex(activeModalId => activeModalId === modalId);
        if (modalIndex !== -1) activeModalIds.splice(modalIndex, 1);
        history.replace({
            pathname: location.pathname,
            search: prepareSearchQueryParams({
                modal: activeModalIds,
            }, newLocation, true),
        });
    }, [location.search, location.pathname, history]);

    const closeAllModals = useCallback(() => {
        history.replace({
            pathname: location.pathname,
            search: prepareSearchQueryParams({
                modal: [],
            }, location.search, true),
        });
    }, [location.search, location.pathname, history]);

    const registerRouteUnmountEffect = useCallback((effectId, effectRef) => {
        if (!location.key) return;

        // side-effect cannot be registered twice for different location
        if (sideEffectsRef.current[effectId]) return;

        const locationSideEffects = locationSideEffectsRef.current[location.key] || [];
        locationSideEffectsRef.current = {
            ...locationSideEffectsRef.current,
            [location.key]: [...locationSideEffects, effectId],
        };
        sideEffectsRef.current = {
            ...sideEffectsRef.current,
            [effectId]: effectRef,
        };

        setRouteUnmountSideEffectCount({
            locationKey: location.key,
            sideEffectCount: locationSideEffectsRef.current[location.key].length,
        });
    }, [location.key, setRouteUnmountSideEffectCount]);

    const unregisterRouteUnmountEffect = (/* effectId */) => {
        // no-op, at the moment not possible to determinate when exactly was `unregister` called
    };

    // call location side-effects on route unmount then clean them up
    useEffect(() => {
        if (prevLocationKey && location.key !== prevLocationKey) {
            const locationSideEffects = locationSideEffectsRef.current[prevLocationKey] || [];

            locationSideEffects.forEach(effectId => {
                const effectRef = sideEffectsRef.current[effectId];
                if (effectRef && typeof effectRef.current === 'function') {
                    effectRef.current({completeRouteUnmountSideEffect});
                }
            });

            // memory clean-up for run side-effects
            const tempSideEffects = sideEffectsRef.current;
            locationSideEffects.forEach(effectId => {
                if (typeof tempSideEffects[effectId] !== 'function') {
                    delete tempSideEffects[effectId];
                }
            });
            sideEffectsRef.current = tempSideEffects;

            // eslint-disable-next-line no-unused-vars
            const {[prevLocationKey]: _, ...restLocationSideEffects} = locationSideEffectsRef.current;
            locationSideEffectsRef.current = {...restLocationSideEffects};
        }
    }, [location.key, prevLocationKey, completeRouteUnmountSideEffect]);

    const childrenContent = (
        <Fragment>
            {children}
            {renderModals({
                modals,
                history,
                location,
                match,
                closeAllModals,
            })}
        </Fragment>
    );

    return (
        <RouterContext.Provider
            value={{
                routes,
                goBack,
                openModal,
                closeModal,
                registerRouteUnmountEffect,
                unregisterRouteUnmountEffect,
            }}
        >
            <RouterStateContext.Provider
                value={{
                    routes,
                    activeRoutePath,
                }}
            >
                {typeof render === 'function'
                    ? render({children: childrenContent}) : childrenContent}
            </RouterStateContext.Provider>
        </RouterContext.Provider>
    );
};

RouterProvider.propTypes = {
    setRouteUnmountSideEffectCount: PropTypes.func.isRequired,
    completeRouteUnmountSideEffect: PropTypes.func.isRequired,
    render: PropTypes.func,
    location: PropTypes.object,
    prevLocationKey: PropTypes.string,
    modals: PropTypes.array,
    routes: PropTypes.array,
    routePaths: PropTypes.object,
    defaultRoutePath: PropTypes.string,
};

RouterProvider.defaultProps = {
    render: null,
    location: null,
    prevLocationKey: null,
    modals: [],
    routes: [],
    routePaths: {},
    defaultRoutePath: '/',
};

const mapStateToProps = state => ({
    location: state.router.location,
    prevLocationKey: state.router.prevLocationKey,
});

const mapDispatchToProps = dispatch => ({
    setRouteUnmountSideEffectCount: payload => dispatch({
        type: actionTypes.SET_ROUTE_UNMOUNT_SIDE_EFFECT_COUNT,
        payload,
    }),
    completeRouteUnmountSideEffect: payload => dispatch({
        type: actionTypes.ROUTE_UNMOUNT_SIDE_EFFECT_COMPLETED,
        payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterProvider);
