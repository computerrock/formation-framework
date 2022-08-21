/**
 * Creates actionTypes for plugin instance
 *
 * @param {string} authName
 */
const createActionTypes = authName => {
    return {
        /**
         * Command action types
         */
        SIGN_IN_USER: `@@formation-auth/${authName}/SIGN_IN_USER`,
        SIGN_OUT_USER: `@@formation-auth/${authName}/SIGN_OUT_USER`,
        END_AUTH_SESSION: `@@formation-auth/${authName}/END_AUTH_SESSION`,

        /**
         * Event action types
         */
        AUTH_SESSION_NOT_VALID: `@@formation-auth/${authName}/AUTH_SESSION_NOT_VALID`,
        AUTH_SESSION_STARTED: `@@formation-auth/${authName}/AUTH_SESSION_STARTED`,
        AUTH_SESSION_ENDED: `@@formation-auth/${authName}/AUTH_SESSION_ENDED`,

        /**
         * Store action types
         */
        SET_AUTH_SESSION_STATUS: `@@formation-auth/${authName}/SET_AUTH_SESSION_STATUS`,
    };
};

export default createActionTypes;
