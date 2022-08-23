import React, {Children} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './RadioButton.module.scss';

const RadioButton = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    const {id, value, onChange, isSelected, isDisabled, qaIdent} = props;

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
            className={cx('ace-c-radio-button', {
                'ace-c-radio-button--is-selected': isSelected,
                'ace-c-radio-button--is-disabled': isDisabled,
            })}
        >
            <input
                id={id}
                ref={ref}
                className={cx('ace-c-radio-button__native-input')}
                type="radio"
                onChange={handleOnChange}
                value={value}
                checked={isSelected}
                disabled={isDisabled}
                data-qa={qaIdent}
            />
            <div className={cx('ace-c-radio-button__input')} />
            {enhancedChildren}
        </label>
    );
});

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
    ...withFormContextPropTypes,
};

RadioButton.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'RadioButton', isSelectable: true})(RadioButton);
