import React from 'react';
import {withFormContext, withFormContextDefaultProps, withFormContextPropTypes} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import RichTextArea from './RichTextArea';

const RichTextAreaField = React.forwardRef((props, ref) => {
    const {className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <RichTextArea
                {...restProps}
                ref={ref}
                isComposedIn={true}
            />
        </FormField>
    );
});

RichTextAreaField.displayName = 'RichTextAreaField';

RichTextAreaField.propTypes = {
    ...withFormContextPropTypes,
};

RichTextAreaField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'RichTextAreaField'})(RichTextAreaField);
