import React from 'react';
import {withFormContext, withFormContextDefaultProps, withFormContextPropTypes} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import TextArea from './TextArea';

const TextAreaField = React.forwardRef((props, ref) => {
    const {className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <TextArea
                {...restProps}
                ref={ref}
                isComposedIn={true}
            />
        </FormField>
    );
});

TextAreaField.displayName = 'TextAreaField';

TextAreaField.propTypes = {
    ...withFormContextPropTypes,
};

TextAreaField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext(TextAreaField);
