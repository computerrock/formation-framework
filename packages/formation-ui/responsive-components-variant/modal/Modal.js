import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Modal.module.scss';
import ModalOverlay from './ModalOverlay';
import {useClickOutside} from '../../application/utils/useClickOutside';
// import {ModalContext} from '@computerrock/formation-ui';

const Modal = props => {
    const {cx} = useStyles(props, styles);
    const {title, action, id, hasBackdrop} = props;
    const {contentClassName} = props;
    const {children, closeFunction} = props;
    const modalRef = useRef(null);
    // todo : close modal when backdrop clicked
    // const {closeModal} = useContext(ModalContext);

    useClickOutside(modalRef, closeFunction);

    return (
        <ModalOverlay id={id}>
            <div className={cx('ace-c-modal__backdrop', {
                'ace-c-modal__backdrop--dark': hasBackdrop,
            })}
            >
                <div className={cx('ace-c-modal')} ref={modalRef}>
                    <div className={cx('ace-c-modal__header')}>
                        {title && (
                            <div
                                className={cx('ace-c-modal__header-title')}
                            >
                                {title}
                            </div>
                        )}
                        {action && (
                            <div className={cx('ace-c-modal__header-action')}>
                                {action}
                            </div>
                        )}
                    </div>
                    <div className={cx('ace-c-modal__content', contentClassName)}>
                        {children}
                    </div>
                </div>
            </div>
        </ModalOverlay>
    );
};

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.node,
    action: PropTypes.node,
    contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    hasBackdrop: PropTypes.bool,
    closeFunction: PropTypes.func,
};

Modal.defaultProps = {
    title: null,
    action: null,
    contentClassName: [],
    hasBackdrop: false,
    closeFunction: () => {},
};

export default Modal;
