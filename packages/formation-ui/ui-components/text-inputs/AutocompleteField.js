import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import Autocomplete from './Autocomplete';

const AutocompleteField = React.forwardRef((props, ref) => {
    const {children, className, ...restProps} = props;
    return (
        <FormField
            {...props}
        >
            <Autocomplete
                {...restProps}
                ref={ref}
                isComposedIn={true}
            >
                {children}
            </Autocomplete>
        </FormField>
    );
});

AutocompleteField.displayName = 'AutocompleteField';

AutocompleteField.propTypes = {
    ...withFormContextPropTypes,
};

AutocompleteField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'AutocompleteField'})(AutocompleteField);
