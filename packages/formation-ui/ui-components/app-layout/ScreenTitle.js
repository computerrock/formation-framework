import React from 'react';
import useStyles from '../useStyles';
import styles from './ScreenTitle.module.scss';

const ScreenTitle = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    return (
        <div className={cx('ace-c-screen-title')}>
            {children}
        </div>
    );
};


export default ScreenTitle;
