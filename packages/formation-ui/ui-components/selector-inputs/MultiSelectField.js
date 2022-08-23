import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import MultiSelect from './MultiSelect';

const MultiSelectField = React.forwardRef((props, ref) => {
    const {children, className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <MultiSelect
                {...restProps}
                ref={ref}
                isComposedIn={true}
            >
                {children}
            </MultiSelect>
        </FormField>
    );
});

MultiSelectField.displayName = 'MultiSelectField';

MultiSelectField.propTypes = {
    ...withFormContextPropTypes,
};

MultiSelectField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'MultiSelectField'})(MultiSelectField);
