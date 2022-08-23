import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './NotificationBar.module.scss';

const NotificationBar = props => {
    const {cx} = useStyles(props, styles);
    const {children, type} = props;

    return (
        <div
            className={cx('ace-c-notification-bar', {
                'ace-c-notification-bar--negative': type === 'negative',
                'ace-c-notification-bar--positive': type === 'positive',
                'ace-c-notification-bar--pending': type === 'pending',
                'ace-c-notification-bar--information': type === 'information',
                'ace-c-notification-bar--primary': type === 'primary',
            })}
        >
            <div className={cx('ace-c-notification-bar__content')}>
                {children}
            </div>
        </div>
    );
};

NotificationBar.propTypes = {
    type: PropTypes.oneOf(['pending', 'positive', 'negative', 'information', 'primary']),
};

NotificationBar.defaultProps = {
    type: 'pending',
};

export default NotificationBar;
