import React, {useRef, useState, useEffect, useCallback} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './ComplexField.module.scss';
import Input from '../text-inputs/Input';
import RadioButton from '../selector-inputs/RadioButton';
import RadioButtonGroup from '../selector-inputs/RadioButtonGroup';

const ComplexField = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {isControlled, name, value, defaultValue, onChange, isDisabled} = props;
    const isTouchedRef = useRef(false);

    // field states
    const [activeInput, setActiveInput] = useState('right');
    const [leftInputValue, setLeftInputValue] = useState('');
    const [rightInputValue, setRightInputValue] = useState(isControlled ? value : defaultValue);

    /**
     * Uncontrolled field onChange handler
     */
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    useEffect(() => {
        if (!isControlled && typeof onChange === 'function' && isTouchedRef.current) {
            onChange(uncontrolledValue);
        }
    }, [isControlled, uncontrolledValue, onChange]);

    /**
     * Handle list value change
     */
    const handleRadioGroupOnChange = useCallback(selectedValue => {
        isTouchedRef.current = true;
        setActiveInput(selectedValue);
        const newValue = selectedValue === 'right' ? leftInputValue : rightInputValue;

        // controlled filed onChange handler
        if (isControlled && typeof onChange === 'function') {
            onChange(newValue);
            return;
        }

        setUncontrolledValue(newValue);
    }, [isControlled, leftInputValue, rightInputValue, setActiveInput, onChange]);

    /**
     * Handle left & right input state change (uncontrolled)
     */
    useEffect(() => {
        if (!isControlled) {
            setUncontrolledValue(activeInput === 'right' ? rightInputValue : leftInputValue);
        }
    }, [isControlled, activeInput, leftInputValue, rightInputValue]);

    /**
     * Handle left & right input onChange
     */
    const handleInputOnChange = (value, inputKey) => {
        if (inputKey === 'left') setLeftInputValue(value);
        if (inputKey === 'right') setRightInputValue(value);

        // Handle left & right input state change (controlled)
        if (isControlled && typeof onChange === 'function' && activeInput === inputKey) {
            onChange(value);
        }
    };

    return (
        <div
            ref={ref}
            className={cx('ace-c-complex-field', {
                'ace-c-complex-field--is-disabled': isDisabled,
            })}
        >
            <RadioButtonGroup
                name={`${name}InputSelector`}
                value={activeInput}
                onChange={handleRadioGroupOnChange}
                isComposedIn={true}
                isDisabled={isDisabled}
            >
                <RadioButton name={`${name}UseLeftInput`} value="left">Use left input</RadioButton><br />
                <RadioButton name={`${name}UseRightInput`} value="right">Use right input</RadioButton>
            </RadioButtonGroup><br /><br />
            <Input
                value={leftInputValue}
                onChange={value => handleInputOnChange(value, 'left')}
                isComposedIn={true}
                isDisabled={isDisabled}
            />&nbsp;&nbsp;
            <Input
                value={rightInputValue}
                onChange={value => handleInputOnChange(value, 'right')}
                isComposedIn={true}
                isDisabled={isDisabled}
            /><br />
            Current value: {isControlled
                ? `${value} (controlled)`
                : `${uncontrolledValue} (uncontrolled)`}
        </div>
    );
});

ComplexField.displayName = 'ComplexField';

ComplexField.propTypes = {
    ...withFormContextPropTypes,
};

ComplexField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext(ComplexField);
