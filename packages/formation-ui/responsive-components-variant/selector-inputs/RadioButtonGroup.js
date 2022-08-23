import React, {Fragment} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';

const RadioButtonGroup = React.forwardRef(({children}, ref) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    );
});

RadioButtonGroup.displayName = 'RadioButtonGroup';

RadioButtonGroup.propTypes = {
    ...withFormContextPropTypes,
};

RadioButtonGroup.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectableGroup: true})(RadioButtonGroup);
