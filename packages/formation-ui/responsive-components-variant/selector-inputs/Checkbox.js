import React, {Children} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import styles from './Checkbox.module.scss';
import useStyles from '../useStyles';

const Checkbox = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {value, onChange, isSelected, isDisabled, children} = props;

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
            />
            <div className={cx('ace-c-checkbox__input')} />
            {enhancedChildren}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
    ...withFormContextPropTypes,
};

Checkbox.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectable: true})(Checkbox);
