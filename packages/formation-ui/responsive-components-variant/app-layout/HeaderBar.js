import React from 'react';
import useStyles from '../useStyles';
import styles from './HeaderBar.module.scss';

const HeaderBar = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-header-bar')}>
            <div className={cx('ace-c-header-bar__content')}>
                {children}
            </div>
        </div>
    );
};

export default HeaderBar;
