import React, {Fragment, useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './Autosuggest.module.scss';
import DropDownContext from '../overlays/DropDownContext';
import DropDown from '../overlays/DropDown';
import withDropDownProvider from '../overlays/withDropDownProvider';
import List from '../selector-inputs/List';
import Input from './Input';
import Icon from '../icons/Icon';
import useFocusSwitch from '../utils/useFocusSwitch';

const Autosuggest = React.forwardRef((props, ref) => {
    // `dropDownTriggerRef` matches forwarded `ref` if present
    const {dropDownTriggerRef, dropDownRef} = useContext(DropDownContext);
    const {openDropDown, closeDropDown, toggleDropDown, isOpen} = useContext(DropDownContext);
    const {cx} = useStyles(props, styles);
    const inputRef = useRef();
    const {children, placeholder, name, value, onChange, isDisabled, qaIdent} = props;
    const {onOptionSelect, optionValueSelector, icon, isArrowIconDisplayed} = props;
    const areChildrenSet = !!children && Array.isArray(children) && children.length > 0;

    useFocusSwitch({
        ref: [dropDownTriggerRef, dropDownRef],
        onClickOutside: () => {
            closeDropDown();
        },
    });

    const onFocusHandler = () => {
        if (areChildrenSet) {
            openDropDown();
        }
    };

    const handleListOnChange = value => {
        if (typeof onOptionSelect === 'function') onOptionSelect(value);

        closeDropDown();
        onChange(typeof optionValueSelector === 'function'
            ? optionValueSelector(value) : value);
    };

    const handleIconOnClick = () => {
        if (!isDisabled) {
            toggleDropDown();
        }
    };

    useEffect(() => {
        if (!inputRef.current) return;

        toggleDropDown(areChildrenSet && document.activeElement === inputRef.current);
    }, [areChildrenSet, toggleDropDown]);

    const isIconDisplayed = !!(!isArrowIconDisplayed && icon);

    return (
        <Fragment>
            <div
                className={cx('ace-c-autosuggest', {
                    'ace-c-autosuggest--is-disabled': isDisabled,
                    'ace-c-autosuggest--is-open': isOpen,
                    'ace-c-autosuggest--is-arrow-icon-displayed': isArrowIconDisplayed && areChildrenSet,
                    'ace-c-autosuggest--is-icon-displayed': isIconDisplayed,
                })}
                ref={dropDownTriggerRef}
                data-qa={qaIdent}
            >
                <Input
                    ref={inputRef}
                    name={`${name}Input`}
                    className={cx('ace-c-autosuggest__input')}
                    value={value}
                    placeholder={placeholder}
                    isComposedIn={true}
                    onChange={onChange}
                    onFocus={onFocusHandler}
                    isDisabled={isDisabled}
                    isAutoCompleteOff={true}
                />
                {isArrowIconDisplayed && areChildrenSet && (
                    <i
                        className={cx('ace-c-autosuggest__arrow-icon')}
                        onClick={handleIconOnClick}
                    />
                )}
                {isIconDisplayed && (
                    <Icon
                        icon={icon}
                        className={cx('ace-c-autosuggest__icon')}
                        onClick={handleIconOnClick}
                    />
                )}
            </div>
            <DropDown>
                <div className={cx('ace-c-autosuggest__drop-down')}>
                    <List
                        name={`${name}DropDownList`}
                        isComposedIn={true}
                        onChange={handleListOnChange}
                    >
                        {children}
                    </List>
                </div>
            </DropDown>
        </Fragment>
    );
});

Autosuggest.displayName = 'Autosuggest';

Autosuggest.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.string, // TODO handling of composed component related props & styles
    onOptionSelect: PropTypes.func,
    isArrowIconDisplayed: PropTypes.bool,
    icon: PropTypes.object,
};

Autosuggest.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: '',
    onOptionSelect: null,
    isArrowIconDisplayed: false,
    icon: null,
};

export default withFormContext({componentName: 'Autosuggest'})(withDropDownProvider(Autosuggest));
