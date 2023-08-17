import {actionChannel, take, put, select} from 'redux-saga/effects';
import {buffers} from 'redux-saga';
import * as actionTypes from '../actionTypes';

export const unregisterRouteUnmountEffectSaga = function* unregisterRouteUnmountEffectSaga() {
    const expandingBuffer = buffers.expanding(10);
    const unregisterRouteUnmountEffectChannel = yield actionChannel(
        [
            actionTypes.UNREGISTER_ROUTE_UNMOUNT_EFFECT,
            actionTypes.LOCATION_CHANGE,
        ],
        expandingBuffer,
    );

    while (true) {
        const {payload} = yield take(unregisterRouteUnmountEffectChannel);
        const {effectId, locationKey, locationSideEffectsRef, sideEffectsRef} = payload;

        // if the location has changed
        if (!effectId) continue;
        // unregisterRouteUnmountEffect triggers on tab change,
        // so we mustn't unregister those effects
        const {location} = yield select(state => state.router);
        if (locationKey !== location?.key) continue;

        // update locationSideEffects map: remove effect with the given ID
        if (locationSideEffectsRef.current[locationKey]) {
            const tempLocationSideEffects = (locationSideEffectsRef.current[locationKey] || [])
                .filter(id => id !== effectId);
            locationSideEffectsRef.current[locationKey] = tempLocationSideEffects;
        }
        // update sideEffectsRef map: remove effect under the given [effectId] property
        const tempSideEffects = sideEffectsRef.current;
        delete tempSideEffects[effectId];
        sideEffectsRef.current = tempSideEffects;

        // update effects counter
        yield put({
            type: actionTypes.SET_ROUTE_UNMOUNT_SIDE_EFFECT_COUNT,
            payload: {
                locationKey,
                sideEffectCount: locationSideEffectsRef.current[locationKey].length,
            },
        });
      }
};

export default unregisterRouteUnmountEffectSaga;
