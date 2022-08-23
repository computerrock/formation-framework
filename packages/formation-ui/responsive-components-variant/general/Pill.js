import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Pill.module.scss';
import {Icon} from '../icons';

const Pill = props => {
    const {cx} = useStyles(props, styles);
    const {children, className, icon} = props;
    return (
        <div className={cx(`ace-c-pill ${className}`)}>
            {icon && (
                <Icon icon={icon} className="ace-c-icon ace-c-icon--24 ace-c-pill__icon" />
            )}
            <span>{children}</span>
        </div>
    );
};

Pill.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.object,
};

Pill.defaultProps = {
    className: '',
    icon: null,
};

export default Pill;
