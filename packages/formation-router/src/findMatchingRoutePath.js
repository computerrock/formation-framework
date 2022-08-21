import {matchPath} from 'react-router';

/**
 * Finds matching route for pathname
 *
 * @param routePaths
 * @param pathname
 * @returns {*}
 */
const findMatchingRoutePath = (routePaths = [], pathname = '') => {
    const matches = [];
    routePaths.forEach(routePath => {
        const match = matchPath(pathname, {
            path: routePath,
        });
        if (match) matches.push(match);
    });
    const exactMatches = matches.filter(match => match.isExact);

    return typeof exactMatches[0] !== 'undefined' ? exactMatches[0].path
        : (typeof matches[0] !== 'undefined' ? matches[0].path : null);
};

export default findMatchingRoutePath;
