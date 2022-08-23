import React, {Fragment, Children, useContext} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Select.module.scss';
import DropDownContext from '../overlays/DropDownContext';
import DropDown from '../overlays/DropDown';
import withDropDownProvider from '../overlays/withDropDownProvider';
import CheckboxGroup from './CheckboxGroup';
import List from './List';

const MultiSelect = React.forwardRef((props, ref) => {
    // `dropDownTriggerRef` matches forwarded `ref` if present
    const {dropDownTriggerRef, toggleDropDown, isOpen} = useContext(DropDownContext);
    const {cx} = useStyles(props, styles);
    const {children, placeholder, name, value, onChange, isDisabled, qaIdent} = props;

    const handleListOnChange = value => {
        onChange(value);
    };

    const valueContent = [];
    Children.forEach(children, child => {
        if (value.includes(child.props.value)) {
            valueContent.push(child.props?.selectedLabel || child.props?.children);
        }
    });

    const handleSelectOnClick = () => {
        if (!isDisabled) {
            toggleDropDown();
        }
    };

    return (
        <Fragment>
            <div
                className={cx('ace-c-select', {
                    'ace-c-select--is-disabled': isDisabled,
                    'ace-c-select--is-open': isOpen,
                })}
                ref={dropDownTriggerRef}
                onClick={handleSelectOnClick}
                data-qa={qaIdent}
            >
                <div className={cx('ace-c-select__selected-content')}>
                    {valueContent?.join(', ') || placeholder}
                </div>
                <i className={cx('ace-c-select__arrow-icon')} />
            </div>
            <DropDown>
                <div className={cx('ace-c-select__drop-down')}>
                    <List>
                        <CheckboxGroup
                            name={`${name}DropDownList`}
                            isComposedIn={true}
                            value={value}
                            onChange={handleListOnChange}
                            isMultipleChoice={true}
                        >
                            {children}
                        </CheckboxGroup>
                    </List>
                </div>
            </DropDown>
        </Fragment>
    );
});

MultiSelect.displayName = 'MultiSelect';

MultiSelect.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.node,
};

MultiSelect.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: null,
};

export default withFormContext({
    componentName: 'MultiSelect',
    isSelectableGroup: true,
    isMultipleChoice: true,
})(withDropDownProvider(MultiSelect));
