import React from 'react';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router';
import RouterProvider from './RouterProvider';

/**
 * Redux first routing
 */
const FormationRouter = ({children, history, ...restProps}) => {
    return (
        <ConnectedRouter history={history}>
            <RouterProvider {...restProps}>
                {children}
            </RouterProvider>
        </ConnectedRouter>
    );
};

FormationRouter.propTypes = {
    render: PropTypes.func,
    history: PropTypes.object.isRequired,
    modals: PropTypes.array,
    routes: PropTypes.array,
    routePaths: PropTypes.object,
    defaultRoutePath: PropTypes.string,
};

FormationRouter.defaultProps = {
    render: null,
    modals: [],
    routes: [],
    routePaths: {},
    defaultRoutePath: '/',
};

export default FormationRouter;
