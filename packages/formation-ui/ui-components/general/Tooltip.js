import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Tooltip.module.scss';

const Tooltip = props => {
    const {cx} = useStyles(props, styles);
    const {children, message} = props;
    return (
        <div className={cx('ace-c-tooltip')}>
            <div className={cx('ace-c-tooltip__hover-element')}>
                {children}
            </div>
            <p className={cx(['ace-c-tooltip__message', 'ace-u-padding--4-8'])}>
                {message}
            </p>
        </div>
    );
};

Tooltip.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Tooltip;
