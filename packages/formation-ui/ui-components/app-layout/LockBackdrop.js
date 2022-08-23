import React from 'react';
import useStyles from '../useStyles';
import styles from './LockBackdrop.module.scss';

const LockBackdrop = props => {
    const {cx} = useStyles(props, styles);

    return (
        <div
            className={cx([
                'ace-c-lock-backdrop',
                'global!ace-u-z-index--lock',
            ])}
        />
    );
};

export default LockBackdrop;
