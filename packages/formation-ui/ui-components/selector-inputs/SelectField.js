import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import Select from './Select';

const SelectField = React.forwardRef((props, ref) => {
    const {children, className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <Select
                {...restProps}
                ref={ref}
                isComposedIn={true}
            >
                {children}
            </Select>
        </FormField>
    );
});

SelectField.displayName = 'SelectField';

SelectField.propTypes = {
    ...withFormContextPropTypes,
};

SelectField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({
    componentName: 'SelectField',
    isMultipleChoice: false,
    isSelectableGroup: true,
})(SelectField);
