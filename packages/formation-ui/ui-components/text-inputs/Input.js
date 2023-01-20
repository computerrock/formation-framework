import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Input.module.scss';

const Input = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {name, value, isDisabled, qaIdent} = props;
    const {placeholder, isAutoCompleteOff} = props;
    const {onChange, onClick, onBlur, onFocus, onKeyDown, type, maxLength} = props;
    const {isRequired, errors, isInvalid} = props;

    const handleOnChange = event => {
        if (typeof onChange === 'function') onChange(event.target.value);
    };

    const handleOnBlur = event => {
        if (typeof onBlur === 'function') onBlur(event.target.value);
    };

    const handleOnFocus = event => {
        if (typeof onFocus === 'function') onFocus(event.target.value);
    };

    const handleOnKeyDown = event => {
        if (typeof onKeyDown === 'function' && event.key === 'Enter') onKeyDown();
    };

    return (
        <input
            ref={ref}
            name={name}
            className={cx('ace-c-input', {
                'ace-c-input--is-disabled': isDisabled,
                'ace-c-input--has-error': errors.length || isInvalid,
                'ace-c-input--is-required': isRequired && value === '',
            })}
            value={value}
            placeholder={errors.length || isInvalid ? '' : placeholder}
            disabled={isDisabled}
            maxLength={maxLength}
            onChange={handleOnChange}
            onClick={onClick}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onKeyDown={handleOnKeyDown}
            {...(isAutoCompleteOff && {autoComplete: 'off'})}
            type={type}
            data-qa={qaIdent}
        />
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.string,
    isAutoCompleteOff: PropTypes.bool,
    type: PropTypes.string,
    isInvalid: PropTypes.bool,
};

Input.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: '',
    isAutoCompleteOff: true,
    type: 'text',
    isInvalid: false,
};

export default withFormContext({componentName: 'Input'})(Input);
