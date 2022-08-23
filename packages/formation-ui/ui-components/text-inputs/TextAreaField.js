import React from 'react';
import {withFormContext, withFormContextDefaultProps, withFormContextPropTypes} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import TextArea from './TextArea';

const TextAreaField = React.forwardRef((props, ref) => {
    const {className, contentClassName, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <TextArea
                {...restProps}
                ref={ref}
                isComposedIn={true}
                className={contentClassName}
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

export default withFormContext({componentName: 'TextAreaField'})(TextAreaField);
