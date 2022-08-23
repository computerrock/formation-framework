import React, {Fragment, useContext, useRef, useEffect, Children} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import DropDown from '../overlays/DropDown';
import DropDownContext from '../overlays/DropDownContext';
import withDropDownProvider from '../overlays/withDropDownProvider';
import Input from './Input';
import List from '../selector-inputs/List';
import Icon from '../icons/Icon';
import styles from './Autocomplete.module.scss';
import useFocusSwitch from '../utils/useFocusSwitch';

const Autocomplete = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, onOptionSelect, placeholder, icon, isArrowIconDisplayed} = props;
    const {isDisabled, name, value, onChange} = props;
    const {dropDownTriggerRef, dropDownRef} = useContext(DropDownContext);
    const {openDropDown, closeDropDown, toggleDropDown, isOpen} = useContext(DropDownContext);
    const inputRef = useRef();
    const areChildrenSet = !!children && Array.isArray(children) && children.length > 0;
    const filteredChildren = areChildrenSet
        ? children.filter(child => (
            child?.props?.children.toLowerCase().includes(value.toLowerCase())
                || child?.props?.value.toLowerCase().includes(value.toLowerCase())))
        : null;

    useFocusSwitch({
        ref: [dropDownTriggerRef, dropDownRef],
        onClickOutside: () => {
            closeDropDown();
        },
    });

    let valueContent = null;
    Children.forEach(children, child => {
        if (child.props.value === value) {
            valueContent = child.props?.children;
        }
    });

    const handleListOnChange = value => {
        if (typeof onOptionSelect === 'function') onOptionSelect(value);

        closeDropDown();
        onChange(value);
    };

    const onFocusHandler = () => {
        if (areChildrenSet) {
            openDropDown();
        }
    };

    const onChangeHandler = value => {
        if (!isOpen) openDropDown();
        onChange(value);
    };

    const handleIconOnClick = () => {
        if (!isDisabled) {
            toggleDropDown();
        }
    };

    useEffect(() => {
        if (!inputRef.current) return;

        toggleDropDown(areChildrenSet && document.activeElement === inputRef.current);
    }, [areChildrenSet, children, toggleDropDown]);

    const isIconDisplayed = !!(!isArrowIconDisplayed && icon);

    return (
        <Fragment>
            <div
                className={cx('ace-c-autocomplete', {
                    'ace-c-autocomplete--is-disabled': isDisabled,
                    'ace-c-autocomplete--open': isOpen,
                    'ace-c-autocomplete--is-arrow-icon-displayed': isArrowIconDisplayed && areChildrenSet,
                })}
                ref={dropDownTriggerRef}
            >
                <Input
                    name={`${name}Input`}
                    className={cx('ace-c-autocomplete__input')}
                    value={valueContent || value}
                    placeholder={placeholder}
                    isComposedIn={true}
                    onChange={onChangeHandler}
                    isDisabled={isDisabled}
                    onFocus={onFocusHandler}
                    isAutoCompleteOff={true}
                />
                {isArrowIconDisplayed && areChildrenSet && (
                    <i
                        className={cx('ace-c-autocomplete__arrow-icon')}
                        onClick={handleIconOnClick}
                    />
                )}
                {isIconDisplayed && (
                    <Icon
                        icon={icon}
                        className={cx('ace-c-autocomplete__icon')}
                        onClick={handleIconOnClick}
                    />
                )}
            </div>
            <DropDown>
                <div className={cx('ace-c-autocomplete__drop-down')}>
                    <List
                        name={`${name}List`}
                        isComposedIn={true}
                        onChange={handleListOnChange}
                    >
                        {filteredChildren}
                    </List>
                </div>
            </DropDown>
        </Fragment>
    );
});

Autocomplete.displayName = 'Autocomplete';

Autocomplete.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.string,
    onOptionSelect: PropTypes.func,
    isArrowIconDisplayed: PropTypes.bool,
    icon: PropTypes.object,
};

Autocomplete.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: '',
    onOptionSelect: null,
    isArrowIconDisplayed: false,
    icon: null,
};

export default withFormContext(withDropDownProvider(Autocomplete));
