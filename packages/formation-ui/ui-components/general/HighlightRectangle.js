import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './HighlightRectangle.module.scss';

const HighlightRectangle = props => {
    const {cx} = useStyles(props, styles);
    const {children, type} = props;
    return (
        <span className={cx('ace-c-highlight-rectangle', {
            'ace-c-highlight-rectangle--negative': type === 'negative',
            'ace-c-highlight-rectangle--positive': type === 'positive',
            'ace-c-highlight-rectangle--pending': type === 'pending',
            'ace-c-highlight-rectangle--information': type === 'information',
        })}
        >
            {children}
        </span>
    );
};

HighlightRectangle.propTypes = {
    type: PropTypes.oneOf(['pending', 'positive', 'negative', 'information']),
};

HighlightRectangle.defaultProps = {
    type: 'pending',
};

export default HighlightRectangle;
