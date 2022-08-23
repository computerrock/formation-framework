import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import styles from './ToggleSwitch.module.scss';
import Checkbox from './Checkbox';
import useStyles from '../useStyles';

const ToggleSwitch = React.forwardRef((props, ref) => {
    const {cx, createClassNameResolver} = useStyles(props, styles);
    const {children, name, ...restProps} = props;
    const {isSelected, isDisabled} = props;
    const classNameResolver = createClassNameResolver('ace-c-toggle-switch');

    return (
        <Checkbox
            {...restProps}
            ref={ref}
            name={`${name}Checkbox`}
            isComposedIn={true}
            classNameResolver={classNameResolver}
            className={cx('ace-c-checkbox--no-chrome', {
                'ace-c-checkbox--is-selected': isSelected,
                'ace-c-checkbox--is-disabled': isDisabled,
            })}
        >
            <span className={cx('ace-c-toggle-switch__track')}>
                <span className={cx('ace-c-toggle-switch__toggle')} />
            </span>
            {children}
        </Checkbox>
    );
});

ToggleSwitch.displayName = 'ToggleSwitch';

ToggleSwitch.propTypes = {
    ...withFormContextPropTypes,
};

ToggleSwitch.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectable: true})(ToggleSwitch);
