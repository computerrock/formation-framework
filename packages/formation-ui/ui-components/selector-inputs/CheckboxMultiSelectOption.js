import React, {Children} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import styles from './Checkbox.module.scss';
import useStyles from '../useStyles';

const CheckboxMultiSelectOption = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    const {value, onChange, isSelected, isDisabled, qaIdent} = props;

    const handleOnChange = event => {
        if (typeof onChange === 'function') onChange(event.target.checked);
    };

    // bind state to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isSelected: isSelected,
            isDisabled: isDisabled,
        });
    });

    return (
        <div
            ref={ref}
            className={cx('ace-c-selector',
                'global!ace-u-full-width', {
                    'ace-c-selector--is-selected': isSelected,
                    'ace-c-selector--is-disabled': isDisabled,
                })}
        >
            <label
                className={cx('ace-c-checkbox', {
                    'ace-c-checkbox--is-selected': isSelected,
                    'ace-c-checkbox--is-disabled': isDisabled,
                })}
            >
                <input
                    ref={ref}
                    className={cx('ace-c-checkbox__native-input')}
                    type="checkbox"
                    onChange={handleOnChange}
                    value={value}
                    checked={isSelected}
                    disabled={isDisabled}
                    data-qa={qaIdent}
                />
                <div className={cx('ace-c-checkbox__input')} />
                {enhancedChildren}
            </label>
        </div>
    );
});

CheckboxMultiSelectOption.displayName = 'CheckboxOption';

CheckboxMultiSelectOption.propTypes = {
    ...withFormContextPropTypes,
};

CheckboxMultiSelectOption.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'CheckboxMultiSelectOption', isSelectable: true})(CheckboxMultiSelectOption);
