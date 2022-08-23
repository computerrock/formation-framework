import React, {Fragment, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useFocusSwitch from '../utils/useFocusSwitch';
import useStyles from '../useStyles';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import DropDown from '../overlays/DropDown';
import DropDownContext from '../overlays/DropDownContext';
import withDropDownProvider from '../overlays/withDropDownProvider';
import ButtonIcon from '../buttons/ButtonIcon';
import List from '../selector-inputs/List';
import Input from './Input';
import styles from './SearchBox.module.scss';
import searchIcon from '../assets/icons/search.svg';

const SearchBox = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, onSearchSubmit, onOptionSelect, placeholder, isDropDownDisabled} = props;
    const {isDisabled, name, value, onChange, qaIdent} = props;
    const {dropDownRef, dropDownTriggerRef, openDropDown, closeDropDown} = useContext(DropDownContext);
    const [isActive, setIsActive] = useState(false);

    useFocusSwitch({
        ref: [dropDownRef, dropDownTriggerRef],
        onClickOutside: () => {
            closeDropDown();
            setIsActive(false);
        },
    });

    useEffect(() => {
        if ((children && value) || (!children && typeof value === 'string' && value.length > 2)) {
            if (isActive && typeof value === 'string' && value.length > 2) {
                openDropDown();
                if (dropDownRef.current && dropDownTriggerRef.current) {
                    dropDownRef.current.style.width = `${dropDownTriggerRef.current.clientWidth}px`;
                }
            } else {
                closeDropDown();
            }
        }
    }, [children, isActive, value, openDropDown, dropDownRef, dropDownTriggerRef, closeDropDown]);

    const onChangeHandler = val => {
        if (!isActive) setIsActive(true);
        onChange(val);
    };

    const handleSubmit = () => {
        if (typeof onSearchSubmit === 'function') {
            onSearchSubmit(value);
            // when submit, close the dropdown
            closeDropDown();
            setIsActive(false);
        }
    };

    const resetSearch = event => {
        // Stop propagation BEFORE focus event
        // Propagation order: mousedown, change, blur, focus, mouseup, click, dblclick
        // We need to use onMouseDown, to catch event before focus
        event.preventDefault();
        event.stopPropagation();
        onChange('');
        closeDropDown();
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter' && typeof onSearchSubmit === 'function') {
            onSearchSubmit(value);
            // NOTE: If it's in form, form will be submitted too
            // when submit, close the dropdown
            closeDropDown();
            setIsActive(false);
        }
    };

    const handleSelectOnChange = selectedValue => {
        if (typeof onOptionSelect === 'function') {
            onOptionSelect(selectedValue);
        }
        closeDropDown();
        setIsActive(false);
    };

    const onFocusHandler = () => {
        setTimeout(() => {
            setIsActive(true);
        }, 500);
    };

    return (
        <Fragment>
            <div
                ref={dropDownTriggerRef}
                className={cx('ace-c-search-box', {
                    'ace-c-search-box--is-disabled': isDisabled,
                })}
                onKeyDown={handleKeyDown}
                data-qa={qaIdent}
            >
                <Input
                    name={`${name}Input`}
                    className={cx('ace-c-search-box__input')}
                    value={value}
                    isComposedIn={true}
                    onChange={onChangeHandler}
                    placeholder={placeholder}
                    onFocus={onFocusHandler}
                    isAutoCompleteOff={true}
                    isDisabled={isDisabled}
                />
                <ButtonIcon
                    className={cx('ace-c-search-box__button-icon', {
                        'ace-c-search-box__button-icon--is-focused': value,
                        'ace-c-search-box__button-icon--is-disabled': isDisabled || !value,
                    })}
                    name={`${name}Button`}
                    icon={searchIcon}
                    isComposedIn={true}
                    onClick={handleSubmit}
                    isDisabled={isDisabled || !value}
                />
                {value && <button className={cx('ace-c-search-box__close-icon')} type="button" onMouseDown={resetSearch} />}
            </div>
            {!isDropDownDisabled && (
                <DropDown className={cx('ace-c-search-box__drop-down')}>
                    <List
                        name={`${name}List`}
                        isComposedIn={true}
                        onChange={handleSelectOnChange}
                    >
                        {children}
                    </List>
                </DropDown>
            )}
        </Fragment>
    );
});

SearchBox.displayName = 'SearchBox';

SearchBox.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.string,
    onSearchSubmit: PropTypes.func,
    onOptionSelect: PropTypes.func,
    isDropDownDisabled: PropTypes.bool,
};

SearchBox.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: 'Mitgliedersuche',
    onSearchSubmit: () => undefined,
    onOptionSelect: () => undefined,
    isDropDownDisabled: false,
};

export default withFormContext({componentName: 'SearchBox'})(withDropDownProvider(SearchBox));
