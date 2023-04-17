import {compile} from 'path-to-regexp';

/**
 * Resolves route pathname for the given path
 *
 * @param routePath
 * @param pathParams
 * @param toParams
 * @returns {{pathname: string}}
 */
const resolveRoute = (routePath = '/', pathParams = {}, toParams = {}) => {
    const toPath = compile(routePath, {encode: encodeURI});

    return {
        pathname: toPath(pathParams),
        ...toParams,
    };
};

export default resolveRoute;
