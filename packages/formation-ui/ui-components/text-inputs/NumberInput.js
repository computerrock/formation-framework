import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './NumberInput.module.scss';

const DEFAULT_LOCALE = 'de-DE';
const ALLOWED_SYMBOLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];

const NumberInput = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {name, placeholder, value, isDisabled, qaIdent, locale, isAutoCompleteOff} = props;
    const {onChange, onClick, onBlur, onFocus, min, areOnlyIntegersAllowed} = props;
    const {isRequired, errors} = props;

    const parsedInputValue = useMemo(() => {
        if (typeof value === 'string') {
            return isNaN(parseFloat(value))
                ? ''
                : value.replace(DEFAULT_LOCALE.includes(locale) ? '.' : ',', DEFAULT_LOCALE.includes(locale) ? ',' : '.');
        }
        if (typeof value === 'number') {
            return value.toString().replace(DEFAULT_LOCALE.includes(locale) ? '.' : ',', DEFAULT_LOCALE.includes(locale) ? ',' : '.');
        }

        return '';
    }, [value, locale]);

    const handleOnChange = event => {
        if (typeof onChange === 'function') {
            onChange(event.target.value.replace(',', '.'));
        }
    };

    const handleOnBlur = event => {
        if (typeof onBlur === 'function') onBlur(event.target.value);
    };

    const handleOnFocus = event => {
        if (typeof onFocus === 'function') onFocus(event.target.value);
    };

    const handleOnKeyDown = event => {
        if (![...ALLOWED_SYMBOLS, ...(min >= 0 ? [] : ['-']), ...(areOnlyIntegersAllowed ? [] : [',', '.'])].includes(event.key)) {
            event.preventDefault();
            return;
        }

        if ([',', '.'].includes(event.key)) {
            const updatedValue = event.target.value.concat(DEFAULT_LOCALE.includes(locale) ? ',' : '.');
            // check if the updated value is valid before proceeding
            // avoid having an invalid number format
            const floatRegex = /^[-]?\d+([.,]\d*)?$/;
            if (floatRegex.test(updatedValue)) event.target.value = updatedValue;
            event.preventDefault();
        }
    };

    return (
        <input
            ref={ref}
            name={name}
            className={cx('ace-c-number-input', {
                'ace-c-number-input--is-disabled': isDisabled,
                'ace-c-number-input--has-error': errors.length,
                'ace-c-number-input--is-required': isRequired && value === '',
            })}
            type="text"
            value={parsedInputValue}
            placeholder={errors.length ? '' : placeholder}
            disabled={isDisabled}
            {...(isAutoCompleteOff && {autoComplete: 'off'})}
            onChange={handleOnChange}
            onClick={onClick}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onKeyDown={handleOnKeyDown}
            data-qa={qaIdent}
        />
    );
});

NumberInput.displayName = 'NumberInput';

NumberInput.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.string,
    min: PropTypes.number,
    locale: PropTypes.string,
    areOnlyIntegersAllowed: PropTypes.bool,
    isAutoCompleteOff: PropTypes.bool,
};

NumberInput.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: '',
    min: undefined,
    locale: DEFAULT_LOCALE, // set german as a default
    areOnlyIntegersAllowed: false,
    isAutoCompleteOff: true,
};

export default withFormContext({componentName: 'NumberInput'})(NumberInput);
