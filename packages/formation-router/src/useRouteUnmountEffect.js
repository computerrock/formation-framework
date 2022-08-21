import {useRef, useContext, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import RouterContext from './RouterContext';

/**
 * Registers effect to be run on route unmount
 */
const useRouteUnmountEffect = (effect, dependencies) => {
    const effectIdRef = useRef(uuidv4());
    const effectCallbackRef = useRef(null);
    const prevCallbackDependenciesRef = useRef([]);
    const {registerRouteUnmountEffect, unregisterRouteUnmountEffect} = useContext(RouterContext);

    useEffect(() => {
        const effectId = effectIdRef.current;
        registerRouteUnmountEffect(effectId, effectCallbackRef);

        return () => unregisterRouteUnmountEffect(effectId);
    }, [registerRouteUnmountEffect, unregisterRouteUnmountEffect]);

    // ESlint check `react-hooks/exhaustive-deps` for dependencies is moved up, to `useRouteUnmountEffect`
    // function itself. Check is configured in `@computerrock/eslint-config-react-app` package
    useEffect(() => {
        const prevDependencies = prevCallbackDependenciesRef.current;
        if (dependencies.some((dependency, index) => !Object.is(dependency, prevDependencies[index]))) {
            effectCallbackRef.current = effect;
            prevCallbackDependenciesRef.current = dependencies;
        }
    }, [effect, dependencies]);
};

export default useRouteUnmountEffect;
