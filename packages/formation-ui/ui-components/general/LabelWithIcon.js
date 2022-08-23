import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './LabelWithIcon.module.scss';

const LabelWithIcon = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {label, children, className} = props;

    return (
        <div
            ref={ref}
            className={cx('ace-c-label-with-icon', [className])}
        >
            <div className={cx('ace-c-label-with-icon__label')}>
                {label}
            </div>
            <div className={cx('ace-c-label-with-icon__icon')}>
                {children}
            </div>
        </div>
    );
});

LabelWithIcon.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

LabelWithIcon.defaultProps = {
    className: [],
};

export default LabelWithIcon;
