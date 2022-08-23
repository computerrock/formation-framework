import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import Autosuggest from './Autosuggest';

const AutosuggestField = React.forwardRef((props, ref) => {
    const {className, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <Autosuggest
                {...restProps}
                ref={ref}
                isComposedIn={true}
            />
        </FormField>
    );
});

AutosuggestField.displayName = 'AutosuggestField';

AutosuggestField.propTypes = {
    ...withFormContextPropTypes,
};

AutosuggestField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'AutosuggestField'})(AutosuggestField);
