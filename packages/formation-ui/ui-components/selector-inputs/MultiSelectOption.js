import React, {Children} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Option.module.scss';
import CheckboxMultiSelectOption from './CheckboxMultiSelectOption';

const MultiSelectOption = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, name, ...restProps} = props;
    const {isSelected, isDisabled} = props;

    // bind state to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isSelected: isSelected,
            isDisabled: isDisabled,
        });
    });

    return (
        <div className={cx('ace-c-option')}>
            <CheckboxMultiSelectOption
                {...restProps}
                ref={ref}
                value={true}
                isSelected={isSelected}
                name={`${name}Checkbox`}
                isComposedIn={true}
            >
                {enhancedChildren}
            </CheckboxMultiSelectOption>
        </div>
    );
});

MultiSelectOption.displayName = 'MultiSelectOption';

MultiSelectOption.propTypes = {
    ...withFormContextPropTypes,
};

MultiSelectOption.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'MultiSelectOption', isSelectable: true})(MultiSelectOption);
