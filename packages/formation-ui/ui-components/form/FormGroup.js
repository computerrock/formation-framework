import React, {useRef, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import FormContext from './FormContext';

/**
 * Enables grouping of fields into form group
 *
 * Context-immediate nested children fields are auto-registered to FormGroup. State of children
 * fields is then controlled by the FormGroup. Aggregated value of FormGroup field is object containing
 * key-value pairs of names and values of nested children fields.
 */
const FormGroup = React.forwardRef((props, ref) => {
    const formFieldRegistryRef = useRef(new Map());
    const [formFieldStates, updateFormFieldStates] = useState(new Map());
    const prevFormGroupValueRef = useRef({});
    const prevGroupFieldPropsRef = useRef(null);
    const isTouchedRef = useRef(false);

    const {baseComponent: BaseComponent, baseComponentProps, fieldProps: groupFieldProps} = props;
    const {fieldName: formGroupName, onChange, isSubmitOnEnterEnabled, onSubmit} = groupFieldProps;

    /**
     * Set initial prevGroupFieldPropsRef
     */
    useEffect(() => {
        if (prevGroupFieldPropsRef.current === null) {
            prevGroupFieldPropsRef.current = groupFieldProps;
        }
    }, [groupFieldProps]);

    /**
     * Register child field
     *
     * @param {string} fieldName
     * @param {Object} fieldProperties
     */
    const registerFormField = useCallback((fieldName, fieldProperties) => {
        const formFieldRegistry = formFieldRegistryRef.current;
        if (!formGroupName || formFieldRegistry.has(fieldName)) return;

        formFieldRegistry.set(fieldName, fieldProperties);
    }, [formGroupName]);

    /**
     * Unregisters child field
     *
     * @param {string} fieldName
     */
    const unregisterFormField = useCallback(fieldName => {
        formFieldRegistryRef.current.delete(fieldName);

        updateFormFieldStates(fieldStates => {
            fieldStates.delete(fieldName);
            return new Map(fieldStates);
        });
    }, []);

    /**
     * Sets child field state
     *
     * @param {string} fieldName
     * @param {Object} stateObject
     */
    const setFormFieldState = useCallback((fieldName, stateObject) => {
        const {isTouched, ...newFieldState} = stateObject;
        if (typeof isTouched === 'boolean' && isTouched !== isTouchedRef.current) {
            isTouchedRef.current = isTouched;
        }

        updateFormFieldStates(fieldStates => {
            const fieldState = fieldStates.get(fieldName);
            fieldStates.set(fieldName, {
                ...fieldState,
                ...newFieldState,
                // over-ride child's new `isDisabled` state if group is disabled
                isDisabled: groupFieldProps.isDisabled === true ? true
                    : (typeof newFieldState.isDisabled === 'boolean'
                        ? newFieldState.isDisabled : fieldState.isDisabled),
            });
            return new Map(fieldStates);
        });
    }, [groupFieldProps.isDisabled]);

    /**
     * Update children field states on group's stateful props change
     */
    useEffect(() => {
        // return if group's stateful props are unchanged
        if (!prevGroupFieldPropsRef.current || shallowequal(prevGroupFieldPropsRef.current, groupFieldProps)) return;

        // update all children `value` state on group's `externalValue` state change
        if (!shallowequal(prevGroupFieldPropsRef.current?.externalValue, groupFieldProps.externalValue)) {
            updateFormFieldStates(fieldStates => {
                fieldStates.forEach((fieldState, fieldName) => {
                    fieldStates.set(fieldName, {
                        ...fieldState,
                        value: groupFieldProps.externalValue[fieldName],
                    });
                });
                return new Map(fieldStates);
            });
        }

        // save new prevGroupFieldProps
        prevGroupFieldPropsRef.current = groupFieldProps;
    }, [groupFieldProps]);

    /**
     * Returns form group value
     *
     * Maps field values from children field states into {fieldName:value} pairs.
     *
     * @param {Object} fieldStates
     * @return {Object}
     */
    const getFormGroupValue = fieldStates => {
        const formGroupValue = {};

        fieldStates.forEach((fieldState, fieldName) => {
            const formFieldRegistry = formFieldRegistryRef.current;
            if (!formFieldRegistry.has(fieldName)) return;

            const formField = formFieldRegistry.get(fieldName);

            // skip if child field is submit button
            if (formField.isSubmitButton) return;

            // skip if child field is part of selectable group
            if (formField.isSelectable && formField.selectableGroupName) return;

            // if child field is selectable and not selected returned value will be undefined
            formGroupValue[fieldName] = !formField.isSelectable
                ? fieldState.value : (fieldState.isSelected ? fieldState.value : undefined);
        });

        return formGroupValue;
    };

    /**
     * Handles form submit event
     *
     * @param event
     */
    const submitForm = useCallback(event => {
        event.preventDefault();
        const {nativeEvent} = event;

        if (typeof onSubmit === 'function'
            && (isSubmitOnEnterEnabled
                ? true : (nativeEvent && nativeEvent.pointerType !== ''))) {
            onSubmit(getFormGroupValue(formFieldStates));
        }
    }, [formFieldStates, isSubmitOnEnterEnabled, onSubmit]);

    /**
     * Form group onChange handler
     */
    useEffect(() => {
        const formGroupValue = getFormGroupValue(formFieldStates);

        // return if form field states are unchanged
        if (shallowequal(prevFormGroupValueRef.current, formGroupValue)) return;

        // save new prevFormFieldStates
        prevFormGroupValueRef.current = formGroupValue;

        if (typeof onChange === 'function' && isTouchedRef.current) {
            onChange(formGroupValue);
        }
    }, [formFieldStates, onChange]);

    // don't provide form context if formGroupName is missing
    if (!formGroupName || typeof formGroupName !== 'string') {
        return (
            <BaseComponent
                {...baseComponentProps}
                ref={ref}
            >
                {typeof baseComponentProps.children === 'function'
                    ? baseComponentProps.children() : baseComponentProps.children}
            </BaseComponent>
        );
    }

    return (
        <FormContext.Provider
            value={{
                formGroupName,
                formFieldRegistry: formFieldRegistryRef.current,
                formFieldStates,
                registerFormField,
                unregisterFormField,
                setFormFieldState,
                isSubmitOnEnterEnabled,
                submitForm,
                formGroupValue: groupFieldProps.value,
                isFormGroupDisabled: groupFieldProps.isDisabled,
            }}
        >
            <BaseComponent
                {...baseComponentProps}
                {...groupFieldProps}
                ref={ref}
                name={formGroupName}
                formFieldStates={formFieldStates}
                submitForm={submitForm}
            >
                {typeof baseComponentProps.children === 'function'
                    ? baseComponentProps.children(getFormGroupValue(formFieldStates)) : baseComponentProps.children}
            </BaseComponent>
        </FormContext.Provider>
    );
});

FormGroup.displayName = 'FormGroup';

FormGroup.propTypes = {
    name: PropTypes.string,
    baseComponent: PropTypes.any.isRequired, // should be of element type, but doesn't play well with forwardRef
    baseComponentProps: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
};

FormGroup.defaultProps = {
    name: '',
};

export default FormGroup;
