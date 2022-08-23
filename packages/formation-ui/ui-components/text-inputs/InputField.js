import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import Input from './Input';

const InputField = React.forwardRef((props, ref) => {
    const {className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <Input
                {...restProps}
                ref={ref}
                isComposedIn={true}
            />
        </FormField>
    );
});

InputField.displayName = 'InputField';

InputField.propTypes = {
    ...withFormContextPropTypes,
};

InputField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'InputField'})(InputField);
