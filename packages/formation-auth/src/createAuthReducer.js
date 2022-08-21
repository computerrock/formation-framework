/**
 * Initial state
 */
const initialState = {
    isSessionValid: null,
};

/**
 * Creates authReducer
 */
const createAuthReducer = context => {
    const {actionTypes} = context;

    return (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.SET_AUTH_SESSION_STATUS: {
                const {isSessionValid} = action.payload;

                state = {
                    ...state,
                    ...(typeof isSessionValid !== 'undefined' && {isSessionValid}),
                };
                break;
            }

            default:
            // no-op
        }
        return state;
    };
};

export default createAuthReducer;
