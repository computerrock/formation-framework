import * as actionTypes from './modalActionTypes';

const initialState = {
    isModalOpen: false,
    activeModalIds: [],
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL: {
            const {id} = action.payload;
            const activeModalIds = [...state.activeModalIds];
            activeModalIds.push(id);
            state = {
                ...state,
                isModalOpen: true,
                activeModalIds,
            };
            break;
        }

        case actionTypes.CLOSE_MODAL: {
            const {id} = action.payload;
            const activeModalIds = state.activeModalIds.filter(activeModalId => activeModalId !== id);
            state = {
                ...state,
                isModalOpen: state.activeModalIds.length > 1,
                activeModalIds,
            };
            break;
        }

        default: {
            // no-op
        }
    }
    return state;
};

export default modalReducer;
