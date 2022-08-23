import React, {Children, useState} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './ButtonGhost.module.scss';

const ButtonGhost = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    const {submitForm, type, onClick, isDisabled, isHighlighted} = props;

    const [isFocused, setIsFocused] = useState(false);

    // bind state to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isDisabled: isDisabled,
            isHighlighted: isHighlighted,
            isFocused: isFocused,
        });
    });

    return (
        <button
            ref={ref}
            // https://github.com/yannickcr/eslint-plugin-react/issues/1555
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={cx('ace-c-button-ghost', {
                'ace-c-button-ghost--is-disabled': isDisabled,
                'ace-c-button-ghost--is-highlighted': isHighlighted,
            })}
            onClick={type === 'submit' ? submitForm : onClick}
            disabled={isDisabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            {enhancedChildren}
        </button>
    );
});

ButtonGhost.propTypes = {
    ...withFormContextPropTypes,
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    isHighlighted: PropTypes.bool,
};

ButtonGhost.defaultProps = {
    ...withFormContextDefaultProps,
    type: 'button',
    onClick: () => {},
    isDisabled: undefined,
    isHighlighted: undefined,
};

export default withFormContext(ButtonGhost);
