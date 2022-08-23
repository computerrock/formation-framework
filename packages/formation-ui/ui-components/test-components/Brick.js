import React from 'react';
import useStyles from '../useStyles';
import styles from './Brick.module.scss';

// this is just a brick (for testing)
const Brick = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;

    return (
        <div className={cx('ace-c-brick')}>
            {children}
        </div>
    );
};

export default Brick;
