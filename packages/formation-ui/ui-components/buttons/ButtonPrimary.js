import React, {Children, useState} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './ButtonPrimary.module.scss';

const ButtonPrimary = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {submitForm, type, onClick, isDisabled, children, qaIdent} = props;

    const [isFocused, setIsFocused] = useState(false);

    // bind state to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isDisabled: isDisabled,
            isFocused: isFocused,
        });
    });

    return (
        <button
            ref={ref}
            // https://github.com/yannickcr/eslint-plugin-react/issues/1555
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={cx('ace-c-button-primary', {
                'ace-c-button-primary--is-disabled': isDisabled,
            })}
            onClick={type === 'submit' ? submitForm : onClick}
            disabled={isDisabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            data-qa={qaIdent}
        >
            {enhancedChildren}
        </button>
    );
});

ButtonPrimary.propTypes = {
    ...withFormContextPropTypes,
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
};

ButtonPrimary.defaultProps = {
    ...withFormContextDefaultProps,
    type: 'button',
    onClick: () => {},
    isDisabled: undefined,
};

export default withFormContext({componentName: 'ButtonPrimary'})(ButtonPrimary);
