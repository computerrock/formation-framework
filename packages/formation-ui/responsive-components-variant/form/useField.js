import {useRef, useContext, useCallback, useEffect, useState, useMemo} from 'react';
import shallowequal from 'shallowequal';
import FormContext from './FormContext';
import SelectableContext from './SelectableContext';

/**
 * @typedef {Object} FieldOptions
 * @property {boolean} [isSelectable]
 * @property {boolean} [isSelectableGroup]
 * @property {boolean} [isMultipleChoice]
 * @property {boolean} [isValidationGroup]
 * @property {boolean} [isFormGroup]
 * @property {boolean} [isSubmitButton]
 */

const callbackPropKeys = ['onChange'];
const statePropKeys = ['value', 'isSelected', 'isDisabled', 'isMultipleChoice', 'onSubmit'];
const registryPropKeys = ['name', 'defaultValue', 'defaultIsSelected', 'isComposedIn'];

/**
 * useField hook
 *
 * @param {Object} props
 * @param {FieldOptions} fieldOptions
 */
const useField = (props, fieldOptions) => {
    const fieldRegistryRef = useRef({hasRegistry: false});
    const prevFieldStatePropsRef = useRef({});
    const [fieldState, updateFieldState] = useState({}); // state for uncontrolled field
    const formContext = useContext(FormContext);
    const selectableContext = useContext(SelectableContext);
    const {formFieldRegistry, formFieldStates} = formContext;
    const {selectableFieldRegistry, selectableFieldStates} = selectableContext;
    const {name: fieldName} = props;

    /**
     * Parse base component props
     *
     * these are non-field props that should be
     * passed back to base component
     */
    const baseComponentProps = useMemo(() => {
        return Object.keys(props).reduce((baseComponentProps, propKey) => {
            if (!registryPropKeys.includes(propKey)
                && !statePropKeys.includes(propKey)
                && !callbackPropKeys.includes(propKey)) {
                baseComponentProps[propKey] = props[propKey];
            }
            return baseComponentProps;
        }, {});
    }, [props]);

    /**
     * Parse stateful field props
     * TODO needs refactoring for external stateful props and handling outside updates
     *
     * any prop that can change over time and will effect state of field
     */
    const fieldStateProps = useMemo(() => {
        const stateProps = Object.keys(props).reduce((stateProps, propKey) => {
            if (statePropKeys.includes(propKey)) {
                stateProps[propKey] = props[propKey];
            }
            return stateProps;
        }, {});

        const {isSelectableGroup, isMultipleChoice: isMultipleChoiceField} = fieldOptions;
        const {isDisabled, isMultipleChoice, ...restStateProps} = stateProps;
        const {value: externalValue, isSelected: externalIsSelected} = restStateProps;

        return {
            ...restStateProps,
            isDisabled: typeof isDisabled === 'boolean' ? isDisabled : false,
            ...(isSelectableGroup && {
                isMultipleChoice: typeof isMultipleChoice === 'boolean'
                    ? isMultipleChoice
                    : (typeof isMultipleChoiceField === 'boolean' ? isMultipleChoiceField : false),
            }),
            externalValue,
            externalIsSelected,
        };
    }, [props, fieldOptions]);

    /**
     * Parse registry field props
     *
     * any prop that will remain static over field lifetime + initial field options
     */
    const fieldRegistryProps = useMemo(() => {
        const registryPropsWithName = Object.keys(props).reduce((registryProps, propKey) => {
            if (registryPropKeys.includes(propKey)) {
                registryProps[propKey] = props[propKey];
            }
            return registryProps;
        }, {});
        const {name: fieldName, ...registryProps} = registryPropsWithName;
        const {formGroupName} = formContext;
        const {selectableGroupName, selectableGroupValue} = selectableContext;
        const {isSelectableGroupMultipleChoice} = selectableContext;
        const {isSelectable, isSelectableGroup, isSubmitButton, isFormGroup} = fieldOptions;
        const {value, isSelected, isMultipleChoice} = fieldStateProps;
        const {defaultValue, defaultIsSelected, isComposedIn} = registryProps;

        const isControlled = isComposedIn
            || !!formGroupName
            || (isSelectable && !!selectableGroupName)
            // when `isSelected` or `value` prop is set, something is controlling field
            || (isSelectable ? typeof isSelected === 'boolean' : (typeof value !== 'undefined' && value !== null));

        let initialValue = isControlled ? value : (defaultValue || '');
        if (isFormGroup) {
            initialValue = !!initialValue && typeof initialValue === 'object' && !Array.isArray(value)
                ? initialValue : {};
        }
        if (isSelectableGroup && isMultipleChoice) {
            initialValue = Array.isArray(initialValue) ? initialValue
                : (typeof initialValue !== 'undefined' && initialValue !== null ? [initialValue] : []);
        }

        let initialIsSelected = isSelectable && selectableGroupName
            ? (isSelectableGroupMultipleChoice && Array.isArray(selectableGroupValue)
                ? selectableGroupValue.includes(value) : selectableGroupValue === value)
            : (isControlled ? isSelected : (typeof defaultIsSelected === 'boolean' ? defaultIsSelected : false));
        initialIsSelected = !isSelectable ? undefined
            : (typeof initialIsSelected === 'boolean' ? initialIsSelected : false);

        return {
            hasRegistry: true,
            fieldName,
            isControlled,
            ...registryProps,
            ...fieldOptions,
            initialValue,
            initialIsSelected,
            selectableGroupName: isSelectable ? selectableGroupName : null,
            formGroupName,
            isSubmitButton,
        };
    }, [props, fieldOptions, fieldStateProps, formContext, selectableContext]);

    /**
     * Current field props
     */
    const currentRegistryProps = formFieldRegistry.get(fieldName)
        || selectableFieldRegistry.get(fieldName)
        || fieldRegistryRef.current;
    const currentStateProps = currentRegistryProps.isControlled
        ? (formFieldStates.get(fieldName)
            || selectableFieldStates.get(fieldName)
            || {...fieldStateProps, ...fieldState}) // TODO check if merge of state is needed?
        : fieldState;
    const {hasRegistry} = currentRegistryProps;

    /**
     * Sets field state
     *
     * @param {Object} stateObject
     */
    const setFieldState = useCallback(stateObject => {
        updateFieldState(fieldState => ({
            ...fieldState,
            ...stateObject,
        }));
    }, []);

    /**
     * Register field
     */
    useEffect(() => {
        // return if field is registered
        if (hasRegistry) return;

        const {fieldName, isControlled, isComposedIn} = fieldRegistryProps;
        const {initialValue, initialIsSelected, formGroupName, selectableGroupName} = fieldRegistryProps;
        const {registerSelectableField, setSelectableFieldState} = selectableContext;
        const {registerFormField, setFormFieldState} = formContext;

        // save initial fieldStateProps
        prevFieldStatePropsRef.current = fieldStateProps;

        // selectable group field, state controlled by SelectableContext
        if (selectableGroupName && isControlled && !isComposedIn) {
            registerSelectableField(fieldName, fieldRegistryProps);
            setSelectableFieldState(fieldName, {
                ...fieldStateProps,
                value: initialValue,
                isSelected: initialIsSelected,
            });
            return;
        }

        // form field, state controlled by FormContext
        if (formGroupName && isControlled && !isComposedIn) {
            registerFormField(fieldName, fieldRegistryProps);
            setFormFieldState(fieldName, {
                ...fieldStateProps,
                value: initialValue,
                isSelected: initialIsSelected,
            });
            return;
        }

        // stand-alone field, state controlled by parent component
        if (isControlled) {
            fieldRegistryRef.current = fieldRegistryProps;
            setFieldState({}); // force re-render
            return;
        }

        // stand-alone field, uncontrolled component
        if (!isControlled) {
            fieldRegistryRef.current = fieldRegistryProps;
            setFieldState({
                ...fieldStateProps,
                value: initialValue,
                isSelected: initialIsSelected,
            });
        }
    }, [hasRegistry, fieldRegistryProps, fieldStateProps, setFieldState, formContext, selectableContext]);

    /**
     * Updates field state on props change
     */
    useEffect(() => {
        // return if field state props are unchanged
        if (shallowequal(prevFieldStatePropsRef.current, fieldStateProps)) return;

        // save new fieldStateProps
        prevFieldStatePropsRef.current = fieldStateProps;

        const {fieldName, isControlled, isComposedIn} = fieldRegistryProps;
        const {selectableGroupName, setSelectableFieldState} = selectableContext;
        const {formGroupName, setFormFieldState} = formContext;

        // selectable group field, state controlled by SelectableContext
        if (selectableGroupName && isControlled && !isComposedIn) {
            const {isSelected, ...allowedFieldStateProps} = fieldStateProps; // TODO maybe this check can be moved
            setSelectableFieldState(fieldName, allowedFieldStateProps);
            return;
        }

        // form field, state controlled by FormContext
        if (formGroupName && isControlled && !isComposedIn) {
            setFormFieldState(fieldName, fieldStateProps);
            return;
        }

        // stand-alone field, state controlled by parent component
        if (isControlled) {
            // no-op
            return;
        }

        // stand-alone field, uncontrolled component
        if (!isControlled) {
            setFieldState(fieldStateProps);
        }
    }, [fieldRegistryProps, fieldStateProps, setFieldState, formContext, selectableContext]);

    /**
     * Field onChange prop
     *
     * @param {boolean|*} newValue - new `value` or `isSelected` state
     */
    const onChange = useCallback(newValue => {
        const {onChange} = props;
        const {fieldName, isSelectable, isComposedIn, isControlled} = currentRegistryProps;
        const {formGroupName, setFormFieldState} = formContext;
        const {selectableGroupName, setSelectableFieldState} = selectableContext;

        // selectable group field, state controlled by SelectableContext
        if (selectableGroupName && isControlled && !isComposedIn) {
            if (typeof onChange === 'function') onChange(newValue);
            setSelectableFieldState(fieldName, {
                isSelected: newValue,
                isTouched: true,
            });
            return;
        }

        // form field, state controlled by FormContext
        if (formGroupName && isControlled && !isComposedIn) {
            if (typeof onChange === 'function') onChange(newValue);
            setFormFieldState(fieldName, {
                ...(!isSelectable ? {value: newValue} : {isSelected: newValue}),
                isTouched: true,
            });
            return;
        }

        // stand-alone field, state controlled by parent component
        if (isControlled) {
            if (typeof onChange === 'function') onChange(newValue);
            return;
        }

        // stand-alone field, uncontrolled component
        if (!isControlled) {
            if (typeof onChange === 'function') onChange(newValue);
            setFieldState({
                ...(!isSelectable ? {value: newValue} : {isSelected: newValue}),
            });
        }
    }, [props, currentRegistryProps, formContext, selectableContext, setFieldState]);

    /**
     * Field submitForm prop
     */
    const submitForm = useCallback(event => {
        const {submitForm} = formContext;
        submitForm(event);
    }, [formContext]);

    /**
     * Return useField effect values
     */
    return {
        fieldName,
        fieldProps: {
            ...currentRegistryProps,
            ...currentStateProps,
            onChange: currentStateProps.isDisabled ? null : onChange,
            ...(fieldRegistryProps.formGroupName && {submitForm: currentStateProps.isDisabled ? null : submitForm}),
        },
        baseComponentProps,
    };
};

export default useField;
