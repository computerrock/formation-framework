import React from 'react';
import useStyles from '../useStyles';
import styles from './NavigationBar.module.scss';

const NavigationBar = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-navigation-bar')}>
            <div className={cx('ace-c-navigation-bar__content')}>
                {children}
            </div>
        </div>
    );
};

export default NavigationBar;
