import React, {Children} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Tab.module.scss';
import Selector from '../selector-inputs/Selector';

const Tab = React.forwardRef((props, ref) => {
    const {cx, createClassNameResolver} = useStyles(props, styles);
    const {children, name, ...restProps} = props;
    const {isSelected, isDisabled} = props;
    const classNameResolver = createClassNameResolver('ace-c-tab');

    // bind state to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isSelected: isSelected,
            isDisabled: isDisabled,
        });
    });

    return (
        <Selector
            {...restProps}
            ref={ref}
            name={`${name}Selector`}
            isComposedIn={true}
            classNameResolver={classNameResolver}
            className={cx('ace-c-selector', {
                'ace-c-selector--is-selected': isSelected,
                'ace-c-selector--is-disabled': isDisabled,
            })}
        >
            {enhancedChildren}
        </Selector>
    );
});

Tab.displayName = 'Tab';

Tab.propTypes = {
    ...withFormContextPropTypes,
};

Tab.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectable: true})(Tab);
