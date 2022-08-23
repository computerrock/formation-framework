import React from 'react';
import useStyles from '../useStyles';
import styles from './HighlightCircle.module.scss';

const HighlightCircle = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-highlight-circle')}>
            {children}
        </div>
    );
};

export default HighlightCircle;
