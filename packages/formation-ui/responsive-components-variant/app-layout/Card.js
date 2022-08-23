import React from 'react';
import useStyles from '../useStyles';
import styles from './Card.module.scss';

const Card = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    return (
        <div className={cx([
            'ace-c-card',
            'global!ace-u-flex',
            'global!ace-u-flex--direction-column',
        ])}
        >
            {children}
        </div>
    );
};

export default Card;
