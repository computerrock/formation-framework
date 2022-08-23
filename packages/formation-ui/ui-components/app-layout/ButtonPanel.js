import React from 'react';
// import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './ButtonPanel.module.scss';

const ButtonPanel = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-button-panel')}>
            {children}
        </div>
    );
};

ButtonPanel.propTypes = {};

ButtonPanel.defaultProps = {};

export default ButtonPanel;
