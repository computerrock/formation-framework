import React from 'react';
import useStyles from '../useStyles';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = props => {
    const {cx} = useStyles(props, styles);
    return (
        <p className={cx('ace-c-error-message')}>
            {props.children}
        </p>
    );
};

export default ErrorMessage;
