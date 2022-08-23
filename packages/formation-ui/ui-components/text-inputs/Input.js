import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Input.module.scss';

const Input = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {name, value, isDisabled, qaIdent} = props;
    const {placeholder, isAutoCompleteOff} = props;
    const {onChange, onClick, onBlur, onFocus, type, disallowedSymbols, min, maxLength} = props;
    const {isRequired, errors} = props;

    const handleOnChange = event => {
        if (typeof onChange === 'function') onChange(event.target.value);
    };

    const handleOnKeyDown = event => {
        if (type === 'number' && disallowedSymbols.includes(event.key)) {
            event.preventDefault();
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
            })}
            value={value}
            placeholder={errors.length ? '' : placeholder}
            disabled={isDisabled}
            maxLength={maxLength}
            onChange={handleOnChange}
            onClick={onClick}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={handleOnKeyDown}
            {...(isAutoCompleteOff && {autoComplete: 'off'})}
            {...(type === 'number' && typeof min === 'number' ? {min: min} : {})}
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
    disallowedSymbols: PropTypes.array,
    min: PropTypes.number,
};

Input.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: '',
    isAutoCompleteOff: true,
    type: 'text',
    disallowedSymbols: [],
    min: undefined,
};

export default withFormContext({componentName: 'Input'})(Input);
