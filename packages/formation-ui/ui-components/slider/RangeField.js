import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import RangeInput from './RangeInput';

const RangeField = React.forwardRef((props, ref) => {
    const {children, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <RangeInput
                {...restProps}
                ref={ref}
                isComposedIn={true}
            />
        </FormField>
    );
});

RangeField.displayName = 'RangeField';

RangeField.propTypes = {
    ...withFormContextPropTypes,
};

RangeField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'RangeField'})(RangeField);
