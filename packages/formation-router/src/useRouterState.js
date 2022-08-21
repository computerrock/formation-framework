import {useContext} from 'react';
import RouterStateContext from './RouterStateContext';

/**
 * Simplifies usage of RouterStateContext
 */
const useRouterState = () => {
    const {routes, activeRoutePath} = useContext(RouterStateContext);

    return {routes, activeRoutePath};
};

export default useRouterState;
