import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../overlays/Overlay';

const ModalOverlay = props => {
    const {children, id, position} = props;

    return (
        // todo add isOpen condition
        <Overlay
            type="modal"
            id={id}
            position={position}
        >
            {children}
        </Overlay>
    );
};

ModalOverlay.propTypes = {
    id: PropTypes.string.isRequired,
    position: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
    }),
};

ModalOverlay.defaultProps = {
    position: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
};

export default ModalOverlay;
