import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';

const InputHidden = React.forwardRef((props, ref) => {
    const {name, value, isDisabled, onChange, qaIdent} = props;

    const handleOnChange = event => {
        if (typeof onChange === 'function') onChange(event.target.value);
    };

    return (
        <input
            ref={ref}
            type="hidden"
            name={name}
            value={value}
            disabled={isDisabled}
            onChange={handleOnChange}
            data-qa={qaIdent}
        />
    );
});

InputHidden.displayName = 'InputHidden';

InputHidden.propTypes = {
    ...withFormContextPropTypes,
};

InputHidden.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'Input'})(InputHidden);
