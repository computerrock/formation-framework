import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {FormationRouter, renderRoutes} from '@computerrock/formation-router';
import {I18nProvider} from '@computerrock/formation-i18n';

/**
 * Formation application main component
 */
const FormationApp = props => {
    const {children} = props;
    const {store, history, i18nService, render} = props;
    const {modals, routes, routePaths, defaultRoutePath} = props;

    return (
        <Provider store={store}>
            <I18nProvider service={i18nService}>
                <FormationRouter
                    history={history}
                    modals={modals}
                    routes={routes}
                    routePaths={routePaths}
                    defaultRoutePath={defaultRoutePath}
                    render={render}
                >
                    {children || renderRoutes(routes)}
                </FormationRouter>
            </I18nProvider>
        </Provider>
    );
};

FormationApp.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    modals: PropTypes.array,
    routes: PropTypes.array,
    routePaths: PropTypes.object,
    defaultRoutePath: PropTypes.string,
    i18nService: PropTypes.object,
    render: PropTypes.func,
};

FormationApp.defaultProps = {
    modals: [],
    routes: [],
    routePaths: {},
    defaultRoutePath: '/',
    i18nService: null,
    render: null,
};

export default FormationApp;
