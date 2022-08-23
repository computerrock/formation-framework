import React from 'react';
import useStyles from '../useStyles';
import styles from './AppLayout.module.scss';

const AppLayout = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    return (
        <div
            id="app"
            className={cx('ace-c-app-layout')}
        >
            {children}
        </div>
    );
};


export default AppLayout;
