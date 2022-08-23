import React from 'react';
import useStyles from '../useStyles';
import styles from './LinkedListItem.module.scss';

const LinkedListItem = props => {
    const {children} = props;
    const {cx} = useStyles(props, styles);

    return (
        <li
            className={cx('ace-c-linked-list-item')}
        >
            {children}
        </li>
    );
};


export default LinkedListItem;
