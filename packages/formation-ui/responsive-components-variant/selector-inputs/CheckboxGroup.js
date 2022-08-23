import React, {Fragment} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';

const CheckboxGroup = React.forwardRef(({children}, ref) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    );
});

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.propTypes = {
    ...withFormContextPropTypes,
};

CheckboxGroup.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectableGroup: true, isMultipleChoice: true})(CheckboxGroup);
