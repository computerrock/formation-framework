import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {StaticRouter, renderRoutes} from '@computerrock/formation-router';

/**
 * Formation server application main component
 */
const FormationAppServer = props => {
    const {children} = props;
    const {store, routes} = props;
    const {reqUrl, context} = props;

    return (
        <Provider store={store}>
            <StaticRouter
                location={reqUrl}
                context={context}
            >
                {children || renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );
};

FormationAppServer.propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.array,
    reqUrl: PropTypes.string.isRequired,
    context: PropTypes.object.isRequired,
};

FormationAppServer.defaultProps = {
    routes: [],
};

export default FormationAppServer;
