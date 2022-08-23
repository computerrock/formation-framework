import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Info.module.scss';
import {Icon, infoIcon, warningIcon} from '../icons';

const Info = props => {
    const {cx} = useStyles(props, styles);
    const {isWarning, children} = props;
    return (
        <div className={cx('ace-c-info', {
            'ace-c-info--is-warning': isWarning,
        })}
        >
            <Icon icon={isWarning ? warningIcon : infoIcon} className={cx('ace-c-icon--24, ace-c-info__icon')} />
            <p className={cx('ace-c-info__text')}>{children}</p>
        </div>
    );
};

Info.propTypes = {
    isWarning: PropTypes.bool,
};

Info.defaultProps = {
    isWarning: false,
};

export default Info;
