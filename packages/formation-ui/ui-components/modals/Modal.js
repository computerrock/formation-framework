import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Modal.module.scss';

const Modal = props => {
    const {cx} = useStyles(props, styles);
    const {title, action, hasBackdrop} = props;
    const {contentClassName} = props;
    const {children} = props;

    return (
        <div
            className={cx('ace-c-modal__backdrop', {
                'ace-c-modal__backdrop--dark': hasBackdrop,
            })}
        >
            <div className={cx('ace-c-modal')}>
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
    );
};

Modal.propTypes = {
    title: PropTypes.node,
    action: PropTypes.node,
    contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    hasBackdrop: PropTypes.bool,
};

Modal.defaultProps = {
    title: null,
    action: null,
    contentClassName: [],
    hasBackdrop: false,
};

export default Modal;
