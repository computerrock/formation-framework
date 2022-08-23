import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Input.module.scss';

const Input = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {name, value, isDisabled, isCurrency} = props;
    const {placeholder, isAutoCompleteOff} = props;
    const {onChange, onClick, onBlur, onFocus, onKeyDown, type, maxLength} = props;
    const {isRequired, errors} = props;

    const handleOnChange = event => {
        const {value} = event.target;
        if (typeof onChange === 'function' && !isCurrency) {
            onChange(value);
        }
        if (isCurrency && typeof onChange === 'function') {
            const char = value.charAt(value.length - 1);
            const regexp = /^[0-9]*(\.[0-9]{0,2})?$/;
            if (name === 'thirdPartyCostsAmount' ? regexp.test(value) : ((char >= '0' && char <= '9') || (char === '.' || char === ',') || !value.length)) {
                onChange(value);
            }
        }
    };

    return (
        <input
            ref={ref}
            name={name}
            className={cx('ace-c-input', {
                'ace-c-input--is-disabled': isDisabled,
                'ace-c-input--has-error': errors.length,
                'ace-c-input--is-required': isRequired && value === '',
                'ace-c-input--full-width': name === 'requestedInvoicingAmount',
            })}
            value={value}
            maxLength={maxLength}
            placeholder={errors.length ? '' : placeholder}
            disabled={isDisabled}
            onChange={handleOnChange}
            onClick={onClick}
            onBlur={onBlur}
            onFocus={onFocus}
            {...(isAutoCompleteOff && {autoComplete: 'off'})}
            type={type}
            onKeyDown={onKeyDown}
        />
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.string,
    isAutoCompleteOff: PropTypes.bool,
    type: PropTypes.string,
};

Input.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: '',
    isAutoCompleteOff: false,
    type: 'text',
};

export default withFormContext(Input);
