import React from 'react';
import PropTypes from 'prop-types';
import {withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './FormField.module.scss';

const FormField = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {label, children, name, errors, errorClassName, isDisabled, isFieldRequired, errorSignClassName} = props;

    return (
        <div
            className={cx('ace-c-form-field', {
                'ace-c-form-field--has-error': errors.length,
                'ace-c-form-field--is-disabled': isDisabled,
            })}
            ref={ref}
        >
            <label
                className={cx('ace-c-form-field__input-label')}
                htmlFor={name}
            >
                {label}
                {isFieldRequired
                    ? <span className={cx('ace-c-form-field__span')}>*</span>
                    : null}
            </label>
            {children}
            {errors && errors.length > 0 && (
                <p className={cx('ace-c-form-field__error-message', errorClassName)}>
                    <i className={cx(['ace-c-form-field__warning-sign', errorSignClassName])} />
                    <span>{errors[0]}</span>
                </p>
            )}
        </div>
    );
});

FormField.displayName = 'FormField';

FormField.propTypes = {
    ...withFormContextPropTypes,
    label: PropTypes.node,
};

FormField.defaultProps = {
    ...withFormContextDefaultProps,
    label: '',
};

export default FormField;
