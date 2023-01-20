import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import NumberInput from './NumberInput';

const NumberInputField = React.forwardRef((props, ref) => {
    const {className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <NumberInput
                {...restProps}
                ref={ref}
                isComposedIn={true}
            />
        </FormField>
    );
});

NumberInputField.displayName = 'NumberInputField';

NumberInputField.propTypes = {
    ...withFormContextPropTypes,
};

NumberInputField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'NumberInputField'})(NumberInputField);
