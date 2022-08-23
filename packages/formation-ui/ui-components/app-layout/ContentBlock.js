import React from 'react';
import useStyles from '../useStyles';
import styles from './ContentBlock.module.scss';

const ContentBlock = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-content-block')}>
            {children}
        </div>
    );
};

export default ContentBlock;
