import React from 'react';
import useStyles from '../useStyles';
import styles from './Circle.module.scss';

const Circle = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    return (
        <div className={cx('ace-c-circle')}>
            {children}
        </div>
    );
};

export default Circle;
