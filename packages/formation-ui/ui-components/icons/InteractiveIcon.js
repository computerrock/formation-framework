import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import Icon from './Icon';
import useStyles from '../useStyles';
import styles from './InteractiveIcon.module.scss';

const InteractiveIcon = props => {
    const {cx} = useStyles(props, styles);
    const {children, icon, onClick, isDisabled, qaIdent} = props;

    const handleOnClick = event => {
        if (typeof onClick === 'function' && !isDisabled) {
            onClick(event);
        }
    };

    return (
        <label
            className={cx('ace-c-interactive-icon', {
                'ace-c-interactive-icon--is-disabled': isDisabled,
                'ace-c-interactive-icon--has-label': !!children,
            })}
            onClick={handleOnClick}
            data-qa={qaIdent}
        >
            <Icon
                icon={icon}
                className={cx('ace-c-interactive-icon__icon')}
            />
            {children}
        </label>
    );
};

InteractiveIcon.propTypes = {
    ...withFormContextPropTypes,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

InteractiveIcon.defaultProps = {
    ...withFormContextDefaultProps,
    onClick: null,
};

export default withFormContext({componentName: 'InteractiveIcon'})(InteractiveIcon);
