import React, {useState, Fragment, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useStyles, Icon} from '@ace-de/ui-components';
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
    const {value, onChange, label, placeholder, errors, minDate, qaIdent, onInvalidDate} = props;
    const {format, name, defaultValue, isDisabled, icon, timePlaceholder, locale} = props;
    const {dropDownTriggerRef, openDropDown, closeDropDown, isOpen} = useContext(DropDownContext);
    const [inputValue, setInputValue] = useState(defaultValue ? moment(defaultValue).format(format) : '');
    const [isTimeExist, setIsTimeExist] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Note: from some reason state of DateField remain stored, then here is check for this case
        if (value === '') {
            setInputValue('');
        }

        if (value) {
            setInputValue(moment(value).format(format));
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
        // this is a part of the bugfix required by ACEECS-4053 in order to help validate field
        if (!inputValue) {
            handleOnChange(inputValue);
        }
        const date = moment(inputValue, format);
        onInvalidDate(!date.isValid());
    };

    const onBlurHandler = () => {
        if (error) {
            setError('');
        }
        if (!inputValue) {
            handleOnChange('');
            return;
        }
        const date = moment(inputValue, format);
        if (date.isValid()) {
            setInputValue(date.format(format));
            handleOnChange(date.format());
            onInvalidDate(false);
            return;
        }
        setError('InvalidDate');
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
            >
                <div className={cx('ace-c-date-field')} data-qa={qaIdent}>
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
                        onFocus={openDropDown}
                        isAutoCompleteOff={true} // disable autocomplete for date field input
                    />
                    {/* Note: icon will be visible in anyway per design */}
                    <Icon
                        icon={icon}
                        className={cx('ace-c-date-field__icon', 'global!ace-c-icon--m', {
                            'ace-c-icon--color-highlight-hover': isOpen,
                        })}
                    />
                </div>
            </FormField>
            <DropDown>
                <DatePicker
                    ref={ref}
                    isComposedIn={true}
                    name={`input-date-picker-${name}`}
                    value={moment(inputValue, format).format()}
                    onChange={onChange}
                    timePlaceholder={timePlaceholder}
                    locale={locale}
                    hasTime={isTimeExist}
                    minDate={minDate}
                />
            </DropDown>
        </Fragment>
    );
});

DateField.displayName = 'DateField';

DateField.propTypes = {
    ...withFormContextPropTypes,
    format: PropTypes.string,
    minDate: PropTypes.string,
    onInvalidDate: PropTypes.func,
};

DateField.defaultProps = {
    ...withFormContextDefaultProps,
    format: 'DD.MM.YYYY',
    minDate: '',
    onInvalidDate: () => {},
};

export default withFormContext({componentName: 'DateField'})(withDropDownProvider(DateField));
