import React from 'react';
import PropTypes from 'prop-types';
import {isValidElementType} from 'react-is';
import useField from './useField';
import FormGroup from './FormGroup';
import SelectableGroup from './SelectableGroup';
// import ValidationGroup from './ValidationGroup';

/**
 * Connects form field with referenced context
 *
 * TODO rename into withFieldContext
 *
 * @param {(FieldOptions|function)} hocParams form field options or components
 * @returns {*}
 */
export const withFormContext = hocParams => {
    const BaseComponent = isValidElementType(hocParams) ? hocParams : null;

    const wrapBaseComponent = BaseComponent => {
        const fieldOptions = isValidElementType(hocParams) ? {} : hocParams;

        const ComposedComponent = React.forwardRef((props, ref) => {
            const {fieldName, fieldProps, baseComponentProps} = useField(props, fieldOptions);

            // return null if field is not ready
            if (!fieldProps.hasRegistry) return null;

            // return FormGroup component
            if (fieldOptions.isFormGroup) {
                return (
                    <FormGroup
                        ref={ref}
                        name={fieldName}
                        baseComponent={BaseComponent}
                        baseComponentProps={baseComponentProps}
                        fieldProps={fieldProps}
                    />
                );
            }

            // return SelectableGroup component
            if (fieldOptions.isSelectableGroup) {
                return (
                    <SelectableGroup
                        ref={ref}
                        name={fieldName}
                        baseComponent={BaseComponent}
                        baseComponentProps={baseComponentProps}
                        fieldProps={fieldProps}
                    />
                );
            }

            // return enhanced BasedComponent (default)
            return (
                <BaseComponent
                    {...baseComponentProps}
                    {...fieldProps}
                    ref={ref}
                    name={fieldName}
                />
            );
        });

        ComposedComponent.displayName = `withFormContext(${BaseComponent.displayName || BaseComponent.name})`;

        ComposedComponent.propTypes = {
            ...BaseComponent.propTypes,
        };

        ComposedComponent.defaultProps = {
            ...BaseComponent.defaultProps,
        };

        return ComposedComponent;
    };

    // return wrapped component
    if (BaseComponent) {
        return wrapBaseComponent(BaseComponent);
    }

    // return component wrapping method
    return wrapBaseComponent;
};

export const withFormContextPropTypes = {
    // Field
    name: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    isSelected: PropTypes.bool,
    defaultIsSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isComposedIn: PropTypes.bool,
    onChange: PropTypes.func,
    // Form group
    submitForm: PropTypes.func,
    // Selectable group
    isMultipleChoice: PropTypes.bool,
    // Validation group
    validate: PropTypes.func,
    isValid: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
};

export const withFormContextDefaultProps = {
    // Field
    name: '',
    value: undefined,
    defaultValue: undefined,
    isSelected: undefined,
    defaultIsSelected: undefined,
    isDisabled: undefined,
    isComposedIn: undefined,
    onChange: () => null,
    // Form group
    submitForm: () => null,
    // Selectable group
    isMultipleChoice: undefined,
    // Validation group
    validate: () => null,
    isValid: true,
    errors: [],
};
