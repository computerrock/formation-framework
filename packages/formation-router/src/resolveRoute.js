import pathToRegexp from 'path-to-regexp';

/**
 * Resolves route pathname for the given path
 *
 * @param routePath
 * @param pathParams
 * @param toParams
 * @returns {{pathname: string}}
 */
const resolveRoute = (routePath = '/', pathParams = {}, toParams = {}) => {
    const toPath = pathToRegexp.compile(routePath);

    return {
        pathname: toPath(pathParams, {encode: encodeURI}),
        ...toParams,
    };
};

export default resolveRoute;
