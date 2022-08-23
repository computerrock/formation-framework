import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';
import ValidationContext from './ValidationContext';

// TODO old code here
const ValidationGroup = props => {
    const {baseComponent: BaseComponent, baseComponentProps, fieldProps} = props;
    const {fieldName: validationGroupName} = fieldProps;
    const {fieldRegistry} = useContext(FormContext);

    /**
     * Sets form field errors
     *
     * @param {string} fieldName
     * @param {boolean} isValid
     * @param {string|Array<string>} errors
     */
    // const setFieldErrors = ({fieldName, isValid, errors}) => {
    //     errors = typeof errors === 'string' ? [errors] : errors;
    //     isValid = typeof isValid === 'undefined' && errors.length ? false : isValid;
    //
    //     setFormFieldState({fieldName, isValid, errors});
    // };

    /**
     * Runs field validation
     */
    // const runFieldValidation = fieldName => {
    //     const formField = fields[fieldName];
    //
    //     // skip if validate is not a function
    //     if (typeof formField.validate !== 'function') return true;
    //
    //     // reset previous validation states
    //     if (!formField.isValid) setFieldErrors({fieldName: formField.name, isValid: true, errors: []});
    //
    //     return !!formField.validate(fields, setFieldErrors);
    // };

    /**
     * Validates form by running all registered validations (fields)
     */
    // const validateForm = () => {
    //     let isFormValid = true;
    //     Object.keys(fields).forEach(fieldName => {
    //         const formField = fields[fieldName];
    //
    //         // skip if field has no validation
    //         if (!formField.isValidationGroup) return;
    //
    //         const isFieldValid = runFieldValidation(fieldName);
    //         isFormValid = isFormValid && isFieldValid;
    //     }, {});
    //
    //     return isFormValid;
    // };

    // scroll to first non valid field
    // useEffect(() => {
    //     const nonValidFieldName = Object.keys(fields).find(fieldName => {
    //         return !fields[fieldName].isValid;
    //     });
    //
    //     const nonValidField = fields[nonValidFieldName];
    //     const nonValidFieldElement = nonValidField && nonValidField.fieldRef
    //         ? nonValidField.fieldRef : null;
    //     if (nonValidFieldElement && nonValidFieldElement.current) {
    //         const rootElement = document.querySelector('#root');
    //         rootElement.scrollTop = nonValidFieldElement.current.offsetTop;
    //     }
    // });

    return (
        <ValidationContext.Provider
            value={{
                validationGroupName: fieldName,
                isGroupValid: formField ? formField.isValid : undefined,
                groupErrors: formField ? formField.errors : [],
            }}
        >
            <BaseComponent
                {...baseComponentProps}
                fieldRef={formField ? formField.fieldRef : null}
                isValid={formField ? formField.isValid : true}
                errors={formField ? formField.errors : []}
            />
        </ValidationContext.Provider>
    );
};

ValidationGroup.displayName = 'ValidationGroup';

ValidationGroup.propTypes = {
    fieldName: PropTypes.string,
    baseComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    baseComponentProps: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
};

ValidationGroup.defaultProps = {
    formContextOptions: {},
};

export default ValidationGroup;
