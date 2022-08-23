import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {matchRoutes} from 'react-router-config';
import ModalContext from './ModalContext';
import renderModals from './renderModals';
import * as actionTypes from './modalActionTypes';

const ModalProvider = props => {
    const {children} = props;
    const {history, location, routes} = props;
    const {modals, activeModalIds, openModal, closeModal} = props;
    const matchedRouteBranch = matchRoutes(routes, location.pathname);
    const {match} = matchedRouteBranch.length > 0
        ? matchedRouteBranch[matchedRouteBranch.length - 1] : {};

    const openModalCallback = useCallback(id => {
        if (id) {
            openModal(id);
        }
    }, [openModal]);

    const closeModalCallback = useCallback(id => {
        if (id) {
            closeModal(id);
        }
    }, [closeModal]);

    return (
        <ModalContext.Provider
            value={{
                openModal: openModalCallback,
                closeModal: closeModalCallback,
            }}
        >
            {children}
            {renderModals({
                modals,
                activeModalIds,
                history,
                location,
                match,
            })}
        </ModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.array,
    modals: PropTypes.array,
    location: PropTypes.object.isRequired,
    activeModalIds: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
};

ModalProvider.defaultProps = {
    routes: [],
    modals: [],
};

const mapStateToProps = state => ({
    location: state.router.location,
    activeModalIds: state.modals.activeModalIds || [],
});

const mapDispatchToProps = dispatch => ({
    openModal: payload => dispatch({type: actionTypes.OPEN_MODAL, payload}),
    closeModal: payload => dispatch({type: actionTypes.CLOSE_MODAL, payload}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalProvider);
