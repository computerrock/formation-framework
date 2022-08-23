import React, {Fragment} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';

const Form = React.forwardRef((props, ref) => {
    const {children, name, onSubmit, formGroupName, qaIdent} = props;

    return !formGroupName ? (
        <form
            ref={ref}
            name={name}
            onSubmit={onSubmit}
            data-qa={qaIdent}
        >
            {children}
        </form>
    ) : (
        <Fragment>
            {children}
        </Fragment>
    );
});

Form.displayName = 'Form';

Form.propTypes = {
    ...withFormContextPropTypes,
};

Form.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'Form', isFormGroup: true})(Form);
