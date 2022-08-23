import React from 'react';
import useStyles from '../useStyles';
import styles from './ContentItem.module.scss';

const ContentItem = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-content-item')}>
            {children}
        </div>
    );
};

export default ContentItem;
