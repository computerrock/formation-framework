import contentType from 'content-type';
import ServerResponseError from './ServerResponseError';

/**
 * Parses response stream into usable format based on content-type
 *
 * @param response
 * @return {*}
 */
const parseResponseStream = response => {
    const responseContentType = contentType.parse(response.headers.get('content-type'));
    const {type} = responseContentType;

    if (['application/json'].indexOf(type) > -1) {
        return response.json();
    }

    if (['text/html', 'application/xml'].indexOf(type) > -1) {
        return response.text();
    }

    if (['application/octet-stream'].indexOf(type) > -1) {
        return Promise.resolve('');
    }

    return Promise.reject(new Error(`[service] Content-type not parsed: '${type}'.`));
};

/**
 * Helper function for handling fetch response errors
 *
 * @param response
 * @return {*}
 */
const handleResponse = response => {
    const responseBody = parseResponseStream(response);

    if (response.ok) {
        return responseBody;
    }

    return responseBody.then(errorMessage => {
        throw new ServerResponseError(errorMessage, response);
    });
};

export default handleResponse;
