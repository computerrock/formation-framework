import React, {useRef, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import SelectableContext from './SelectableContext';

/**
 * Enables grouping of fields into selectable group
 *
 * Context-immediate nested children fields are auto-registered to SelectableGroup. State of children
 * fields is then controlled by the SelectableGroup. Aggregated value of SelectableGroup field is either
 * a value of selected (checked) children field (non-multiple choice groups), or Array containing
 * values of selected (checked) children fields (multiple choice groups).
 */
const SelectableGroup = React.forwardRef((props, ref) => {
    const selectableFieldRegistryRef = useRef(new Map());
    const [selectableFieldStates, updateSelectableFieldStates] = useState(new Map());
    const prevSelectableGroupValueRef = useRef(null);
    const prevGroupFieldPropsRef = useRef(null);
    const isTouchedRef = useRef(false);

    const {baseComponent: BaseComponent, baseComponentProps, fieldProps: groupFieldProps} = props;
    const {fieldName: selectableGroupName, onChange} = groupFieldProps;

    /**
     * Set initial prevGroupFieldPropsRef
     */
    useEffect(() => {
        if (prevGroupFieldPropsRef.current === null) {
            prevGroupFieldPropsRef.current = groupFieldProps;
        }
    }, [groupFieldProps]);

    /**
     * Registers child field
     *
     * @param {string} fieldName
     * @param {Object} fieldProperties
     */
    const registerSelectableField = useCallback((fieldName, fieldProperties) => {
        const selectableFieldRegistry = selectableFieldRegistryRef.current;
        if (!selectableGroupName || selectableFieldRegistry.has(fieldName)) return;

        selectableFieldRegistry.set(fieldName, fieldProperties);
    }, [selectableGroupName]);

    /**
     * Unregisters child field
     *
     * @param {string} fieldName
     */
    const unregisterSelectableField = useCallback(fieldName => {
        selectableFieldRegistryRef.current.delete(fieldName);

        updateSelectableFieldStates(fieldStates => {
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
    const setSelectableFieldState = useCallback((fieldName, stateObject) => {
        const {isTouched, ...newFieldState} = stateObject;
        const {isSelected} = newFieldState;
        if (typeof isTouched === 'boolean' && isTouched !== isTouchedRef.current) {
            isTouchedRef.current = isTouched;
        }

        updateSelectableFieldStates(fieldStates => {
            // if child's `isSelected` state is changed and group is
            // not multiple choice, unselect other children
            if (typeof isSelected === 'boolean' && !groupFieldProps.isMultipleChoice) {
                fieldStates.forEach((otherFieldState, otherFieldName) => {
                    if (otherFieldName !== fieldName) {
                        fieldStates.set(otherFieldName, {
                            ...otherFieldState,
                            isSelected: isSelected === true ? false : otherFieldState.isSelected,
                        });
                    }
                });
            }

            // map state for changed child field
            const fieldState = fieldStates.get(fieldName);
            fieldStates.set(fieldName, {
                ...fieldState,
                ...newFieldState,
                isSelected,
                // over-ride child's new `isDisabled` state if group is disabled
                isDisabled: groupFieldProps.isDisabled === true
                    ? true
                    : (typeof newFieldState.isDisabled === 'boolean'
                        ? newFieldState.isDisabled : fieldState.isDisabled),
            });
            return new Map(fieldStates);
        });
    }, [groupFieldProps.isDisabled, groupFieldProps.isMultipleChoice]);

    /**
     * Update children field states on group's stateful props change
     */
    useEffect(() => {
        // return if group's stateful props are unchanged
        if (!prevGroupFieldPropsRef.current || shallowequal(prevGroupFieldPropsRef.current, groupFieldProps)) return;

        // update all children `isDisabled` state on group's `isDisabled` state change
        if (prevGroupFieldPropsRef.current?.isDisabled !== groupFieldProps.isDisabled) {
            updateSelectableFieldStates(fieldStates => {
                fieldStates.forEach((fieldState, fieldName) => {
                    fieldStates.set(fieldName, {
                        ...fieldState,
                        isDisabled: groupFieldProps.isDisabled,
                    });
                });
                return new Map(fieldStates);
            });
        }

        // update all children `isSelected` state on group's `externalValue` state change
        if (groupFieldProps.isMultipleChoice
            ? !shallowequal(prevGroupFieldPropsRef.current?.externalValue, groupFieldProps.externalValue)
            : prevGroupFieldPropsRef.current?.externalValue !== groupFieldProps.externalValue) {
            updateSelectableFieldStates(fieldStates => {
                fieldStates.forEach((fieldState, fieldName) => {
                    fieldStates.set(fieldName, {
                        ...fieldState,
                        isSelected: groupFieldProps.isMultipleChoice && Array.isArray(groupFieldProps.value)
                            ? groupFieldProps.externalValue.includes(fieldState.value)
                            : groupFieldProps.externalValue === fieldState.value,
                    });
                });
                return new Map(fieldStates);
            });
        }

        // when group switches from multiple choice to single choice,
        // leave only first selected child in selected state
        if (prevGroupFieldPropsRef.current?.isMultipleChoice !== groupFieldProps.isMultipleChoice
            && groupFieldProps.isMultipleChoice === false) {
            updateSelectableFieldStates(fieldStates => {
                let selectedFieldSet = false;
                fieldStates.forEach((fieldState, fieldName) => {
                    const newIsSelected = !selectedFieldSet ? fieldState.isSelected : false;
                    fieldStates.set(fieldName, {
                        ...fieldState,
                        isSelected: newIsSelected,
                    });
                    if (newIsSelected) selectedFieldSet = true;
                });
                return new Map(fieldStates);
            });
        }

        // save new prevGroupFieldProps
        prevGroupFieldPropsRef.current = groupFieldProps;
    }, [groupFieldProps]);

    /**
     * Returns selectable group value
     *
     * Parses selectable group value from children field states while respecting
     * groupFieldProps.isMultipleChoice setting. Either single or array of values is returned.
     *
     * @param {Object} fieldStates
     * @param {boolean} isSelectableGroupMultipleChoice
     */
    const getSelectableGroupValue = (fieldStates, isSelectableGroupMultipleChoice) => {
        let selectableGroupValue;

        if (isSelectableGroupMultipleChoice) {
            selectableGroupValue = [];
            fieldStates.forEach(fieldState => {
                if (fieldState.isSelected) selectableGroupValue.push(fieldState.value);
            });
            selectableGroupValue = [...new Set(selectableGroupValue)];
        }

        if (!isSelectableGroupMultipleChoice) {
            fieldStates.forEach(fieldState => {
                if (fieldState.isSelected) selectableGroupValue = fieldState.value;
            });
        }

        return selectableGroupValue;
    };

    /**
     * Selectable group onChange handler
     */
    useEffect(() => {
        const selectableGroupValue = getSelectableGroupValue(selectableFieldStates, groupFieldProps.isMultipleChoice);

        // return if selectable group value is unchanged
        if (shallowequal(prevSelectableGroupValueRef.current, selectableGroupValue)) return;

        // save new prevSelectableFieldStates
        prevSelectableGroupValueRef.current = selectableGroupValue;

        if (typeof onChange === 'function' && isTouchedRef.current) {
            onChange(selectableGroupValue);
        }
    }, [selectableFieldStates, groupFieldProps.isControlled, groupFieldProps.isMultipleChoice, onChange]);

    // don't provide selectable context if selectableGroupName is missing
    if (!selectableGroupName || typeof selectableGroupName !== 'string') {
        return (
            <BaseComponent
                {...baseComponentProps}
                ref={ref}
            />
        );
    }

    return (
        <SelectableContext.Provider
            value={{
                selectableGroupName,
                selectableFieldRegistry: selectableFieldRegistryRef.current,
                selectableFieldStates,
                registerSelectableField,
                unregisterSelectableField,
                setSelectableFieldState,
                selectableGroupValue: groupFieldProps.value,
                isSelectableGroupDisabled: groupFieldProps.isDisabled,
                isSelectableGroupMultipleChoice: groupFieldProps.isMultipleChoice,
            }}
        >
            <BaseComponent
                {...baseComponentProps}
                {...groupFieldProps}
                ref={ref}
                name={selectableGroupName}
                selectableFieldStates={selectableFieldStates}
            />
        </SelectableContext.Provider>
    );
});

SelectableGroup.displayName = 'SelectableGroup';

SelectableGroup.propTypes = {
    name: PropTypes.string,
    baseComponent: PropTypes.any.isRequired, // should be of element type, but doesn't play well with forwardRef
    baseComponentProps: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
};

SelectableGroup.defaultProps = {
    name: '',
};

export default SelectableGroup;
