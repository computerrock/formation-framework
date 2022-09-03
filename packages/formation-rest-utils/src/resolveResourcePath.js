import {compile} from 'path-to-regexp';

/**
 * Resolves resource path for the given route and params
 *
 * @param {string} routePath
 * @param {Object} pathParams
 */
const resolveResourcePath = (routePath = '/', pathParams = {}) => {
    const toPath = compile(routePath, {encode: encodeURI});
    return toPath(pathParams);
};

export default resolveResourcePath;
