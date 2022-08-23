import React, {Fragment, Children, useContext} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Select.module.scss';
import DropDownContext from '../overlays/DropDownContext';
import DropDown from '../overlays/DropDown';
import withDropDownProvider from '../overlays/withDropDownProvider';
import List from './List';

const Select = React.forwardRef((props, ref) => {
    // `dropDownTriggerRef` matches forwarded `ref` if present
    const {dropDownTriggerRef, toggleDropDown, closeDropDown, isOpen} = useContext(DropDownContext);
    const {cx} = useStyles(props, styles);
    const {children, placeholder, name, value, onChange, isDisabled} = props;

    const handleListOnChange = value => {
        onChange(value);
        closeDropDown();
    };

    let valueContent = null;
    Children.forEach(children, child => {
        if (child.props.value === value) {
            valueContent = child.props?.selectedLabel || child.props?.children;
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
            >
                <div className={cx('ace-c-select__selected-content')}>
                    {valueContent || placeholder}
                </div>
                <i className={cx('ace-c-select__arrow-icon')} />
            </div>
            <DropDown>
                <div className={cx('ace-c-select__drop-down')}>
                    <List
                        name={`${name}DropDownList`}
                        isComposedIn={true}
                        value={value}
                        onChange={handleListOnChange}
                    >
                        {children}
                    </List>
                </div>
            </DropDown>
        </Fragment>
    );
});

Select.displayName = 'Select';

Select.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.node,
};

Select.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: null,
};

export default withFormContext({isSelectableGroup: true})(withDropDownProvider(Select));
