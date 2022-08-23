import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import InputWithButton from './InputWithButton';

const InputWithButtonField = React.forwardRef((props, ref) => {
    const {children, className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <InputWithButton
                {...restProps}
                ref={ref}
                isComposedIn={true}
            >
                {children}
            </InputWithButton>
        </FormField>
    );
});

InputWithButtonField.displayName = 'InputWithButtonField';

InputWithButtonField.propTypes = {
    ...withFormContextPropTypes,
};

InputWithButtonField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'InputWithButtonField'})(InputWithButtonField);
