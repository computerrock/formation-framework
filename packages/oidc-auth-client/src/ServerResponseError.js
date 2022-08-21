/**
 * Indicates a method could not be completed because invalid arguments were provided
 */
export default class ServerResponseError extends Error {
    /**
     * @param {string} message
     * @param {Object} response
     * @constructs {Error} ServerResponseError
     */
    constructor(message = '', response) {
        super(message);

        // removes custom error reference from stack trace (available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerResponseError);
        }

        this.response = response;
    }
}
