import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Badge.module.scss';

const Badge = props => {
    const {cx} = useStyles(props, styles);
    const {children, status} = props;
    return (
        <span
            className={cx('ace-c-badge', {
                'ace-c-badge--status-default': status === 'default',
                'ace-c-badge--status-notification': status === 'notification',
                'ace-c-badge--status-silver': status === 'silver',
                'ace-c-badge--status-gold': status === 'gold',
                'ace-c-badge--status-platinum': status === 'platinum',
                'ace-c-badge--status-positive': status === 'positive',
            })}
        >
            {children}
        </span>
    );
};

Badge.propTypes = {
    status: PropTypes.oneOf(['default', 'notification', 'silver', 'gold', 'platinum', 'positive']),
};

Badge.defaultProps = {
    status: 'default',
};

export default Badge;
