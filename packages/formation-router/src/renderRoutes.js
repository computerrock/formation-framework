import React from 'react';
import {Switch, Route} from 'react-router';

const renderRoutes = function renderRoutes(routes, extraProps = {}, switchProps = {}) {
    return routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={props => {
                        return route.render
                            ? route.render({...props, ...extraProps, route: route})
                            : React.createElement(route.component, {...props, ...extraProps, route: route});
                    }}
                />
            ))}
        </Switch>
    ) : null;
};

export default renderRoutes;
