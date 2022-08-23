import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Pill.module.scss';

const Pill = props => {
    const {cx} = useStyles(props, styles);
    const {children, type, title} = props;
    return (
        <div
            className={cx('ace-c-pill', {
                'ace-c-pill--negative': type === 'negative',
                'ace-c-pill--positive': type === 'positive',
                'ace-c-pill--pending': type === 'pending',
                'ace-c-pill--information': type === 'information',
            })}
            {...(title && {title})}
        >
            <div className={cx('ace-c-pill__content')}>
                {children}
            </div>
        </div>
    );
};

Pill.propTypes = {
    type: PropTypes.oneOf(['pending', 'positive', 'negative', 'information']),
    title: PropTypes.string,
};

Pill.defaultProps = {
    type: 'pending',
    title: '',
};

export default Pill;
