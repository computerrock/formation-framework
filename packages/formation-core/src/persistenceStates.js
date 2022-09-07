/**
 * @typedef {string} persistenceState
 */

/**
 * Entity persistence states
 *
 * @enum {persistenceState}
 */
export default {
    UNKNOWN: 'UNKNOWN',
    READY: 'READY',
    PENDING: 'PENDING',
    SUCCEEDED: 'SUCCEEDED',
    FAILED: 'FAILED',
};
