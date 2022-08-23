import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './TestComponent.module.scss';
import Checkbox from '../selector-inputs/Checkbox';

const Test = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, createClassNameResolver, className, name, ...restProps} = props;
    const {isSelected, isDisabled} = props;
    const classNameResolver = createClassNameResolver('ace-c-test');

    return (
        <div data-qa="test_component">
            <Checkbox
                {...restProps}
                ref={ref}
                name={`${name}Checkbox`}
                isComposedIn={true}
                classNameResolver={classNameResolver}
                className={cx('ace-c-checkbox--no-chrome', className, {
                    'ace-c-checkbox--is-selected': isSelected,
                    'ace-c-checkbox--is-disabled': isDisabled,
                })}
                data-qa="checkbox_parent"
            >
                <span className={cx('ace-c-test__track')} data-qa="test_component_checkbox_track">
                    <span className={cx('ace-c-test__toggle')} data-qa="test_component_checkbox__toggle" />
                </span>
                {children}
            </Checkbox>
        </div>
    );
});

Test.displayName = 'Test';

Test.propTypes = {
    ...withFormContextPropTypes,
};

Test.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectable: true})(Test);
