import React from 'react';
import useStyles from '../useStyles';
import styles from './PanelHeader.module.scss';

const PanelHeader = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-panel-header')}>
            {children}
        </div>
    );
};

export default PanelHeader;
