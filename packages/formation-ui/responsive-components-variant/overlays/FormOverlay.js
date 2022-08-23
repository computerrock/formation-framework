import React from 'react';
import styles from './FormOverlay.module.scss';
import useStyles from '../useStyles';

const FormOverlay = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-form-overlay')}>
            <div className={cx('ace-c-form-overlay__content')}>
                {children}
            </div>
        </div>
    );
};

export default FormOverlay;
