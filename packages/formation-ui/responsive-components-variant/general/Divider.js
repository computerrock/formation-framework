import React from 'react';
import useStyles from '../useStyles';
import styles from './Divider.module.scss';

const Divider = props => {
    const {cx} = useStyles(props, styles);
    return (
        <hr className={cx('ace-c-divider')} />
    );
};


export default Divider;
