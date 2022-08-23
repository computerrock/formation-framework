import React, {useState, Fragment, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import useStyles from '../useStyles';
import {Icon} from '../icons';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import DropDown from '../overlays/DropDown';
import DropDownContext from '../overlays/DropDownContext';
import withDropDownProvider from '../overlays/withDropDownProvider';
import DatePicker from '../advanced-inputs/DatePicker';
import FormField from '../form-elements/FormField';
import Input from './Input';
import styles from './DateField.module.scss';

const DateField = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {value, onChange, label, placeholder, errors, direction, maxDate} = props;
    const {format, name, defaultValue, isDisabled, icon, timePlaceholder, locale} = props;
    const {dropDownTriggerRef, openDropDown, closeDropDown, isOpen} = useContext(DropDownContext);
    const [inputValue, setInputValue] = useState(defaultValue ? moment(defaultValue).format(format) : '');
    const [isTimeExist, setIsTimeExist] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (value) {
            setInputValue(moment(value).format(format));
        }

        if (value === '') {
            setInputValue('');
        }

        if (format) {
            setIsTimeExist(formatTimeHandler(format));
        }
    }, [value, format, setIsTimeExist]);

    const handleOnChange = value => {
        if (typeof onChange === 'function') onChange(value);
    };

    const onInputChange = inputValue => {
        setInputValue(inputValue);
    };

    const onBlurHandler = () => {
        if (error) {
            setError('');
        }
        if (!inputValue) {
            handleOnChange('');
            setInputValue('');
            return;
        }
        const date = moment(inputValue, format);
        if (date.isValid() && (maxDate === null || maxDate.isSameOrAfter(date))) {
            setInputValue(date.format(format));
            handleOnChange(date.format());
            return;
        }
        setError('Invalid date');
        closeDropDown();
    };

    const invalidDateError = error ? [error] : [];

    const formatTimeHandler = format => {
        let isTimeExist = false;
        const formatSplit = format && format.split(',')[1];
        const formatTime = formatSplit !== undefined && formatSplit.trim();
        if (formatTime === 'HH:mm') {
            isTimeExist = true;
        }

        return isTimeExist;
    };

    return (
        <Fragment>
            <FormField
                {...props}
                label={label}
                errors={error ? [error] : []}
            >
                <div className={cx('ace-c-date-field')}>
                    <Input
                        className={cx('ace-c-date-field__input', {
                            'ace-c-date-field__input--is-focused': isOpen,
                        })}
                        ref={dropDownTriggerRef}
                        isComposedIn={true}
                        name={`${name}Text`}
                        placeholder={placeholder}
                        value={inputValue}
                        isDisabled={isDisabled}
                        errors={errors.length ? errors : invalidDateError}
                        onChange={onInputChange}
                        onBlur={onBlurHandler}
                        onClick={openDropDown}
                    />
                    {/* Note: icon will be visible in anyway per design */}
                    <Icon
                        icon={icon}
                        className={cx('ace-c-date-field__icon', 'global!ace-c-icon--m', {
                            'ace-c-date-field__icon--is-focused': isOpen,
                            'ace-c-date-field__icon--has-error': !!error,
                        })}
                    />
                </div>
            </FormField>
            <DropDown direction={direction}>
                <DatePicker
                    ref={ref}
                    isComposedIn={true}
                    name={`input-date-picker-${name}`}
                    value={moment(inputValue, format).format()}
                    onChange={onChange}
                    timePlaceholder={timePlaceholder}
                    locale={locale}
                    hasTime={isTimeExist}
                    maxDate={maxDate}
                />
            </DropDown>
        </Fragment>
    );
});

DateField.displayName = 'DateField';

DateField.propTypes = {
    ...withFormContextPropTypes,
    format: PropTypes.string,
    direction: PropTypes.string,
    maxDate: PropTypes.object,
};

DateField.defaultProps = {
    ...withFormContextDefaultProps,
    format: 'DD.MM.YYYY',
    direction: null,
    maxDate: null,
};

export default withFormContext(withDropDownProvider(DateField));
