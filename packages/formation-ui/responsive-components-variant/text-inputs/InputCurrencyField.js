import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import FormField from '../form-elements/FormField';
import InputCurrency from './InputCurrency';

const InputCurrencyField = React.forwardRef((props, ref) => {
    const {className, onKeyDown, ...restProps} = props;

    return (
        <FormField
            {...props}
        >
            <InputCurrency
                {...restProps}
                ref={ref}
                isComposedIn={true}
                onKeyDown={onKeyDown}
            />
        </FormField>
    );
});

InputCurrencyField.displayName = 'InputCurrencyField';

InputCurrencyField.propTypes = {
    ...withFormContextPropTypes,
};

InputCurrencyField.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext(InputCurrencyField);
