import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import InputTime from './InputTime';

const TimeField = React.forwardRef((props, ref) => {
    const {children, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <InputTime
                {...restProps}
                ref={ref}
                isComposedIn={true}
            />
        </FormField>
    );
});

TimeField.displayName = 'TimeField';

TimeField.propTypes = {
    ...withFormContextPropTypes,
};

TimeField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'TimeField'})(TimeField);
