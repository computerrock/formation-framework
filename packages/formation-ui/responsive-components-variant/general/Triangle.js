import React from 'react';
import useStyles from '../useStyles';
import styles from './Triangle.module.scss';

const Triangle = props => {
    const {cx} = useStyles(props, styles);

    return (
        <div className={cx('ace-c-triangle')} />
    );
};

export default Triangle;
