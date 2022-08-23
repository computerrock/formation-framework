import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import DropDown from '../overlays/DropDown';
import DropDownContext from '../overlays/DropDownContext';
import withDropDownProvider from '../overlays/withDropDownProvider';
import List from '../selector-inputs/List';
import Option from '../selector-inputs/Option';
import Icon from '../icons/Icon';
import {arrowDownIcon} from '../icons';
import generateTimeFieldOptions from '../utils/generateTimeFieldOptions';
import Input from './Input';
import styles from './InputTime.module.scss';

const timeOptionsArray = generateTimeFieldOptions();

const InputTime = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {onOptionSelect, placeholder, icon} = props;
    const {isDisabled, name, value, onChange, errors} = props;
    const {dropDownTriggerRef, openDropDown, closeDropDown} = useContext(DropDownContext);

    const filteredTimeOptions = value
        ? timeOptionsArray.filter(timeOption => timeOption.includes(value))
        : timeOptionsArray;

    const handleListOnChange = selectedValue => {
        if (typeof onOptionSelect === 'function') {
            onOptionSelect(selectedValue);
        }
        onChange(selectedValue);
        closeDropDown();
    };

    const onFocusHandler = () => {
        if (filteredTimeOptions) {
            openDropDown();
        }
    };

    return (
        <Fragment>
            <div
                className={cx('ace-c-input-time')}
                ref={dropDownTriggerRef}
            >
                <Input
                    name={`${name}Input`}
                    className={cx(['ace-c-input-time__input', 'global!ace-u-flex--grow-1'])}
                    value={value}
                    isComposedIn={true}
                    onChange={onChange}
                    placeholder={placeholder}
                    isDisabled={isDisabled}
                    onFocus={onFocusHandler}
                    isAutoCompleteOff={true}
                    errors={errors}
                />
                <Icon
                    icon={icon}
                    className={cx('ace-c-input-time__icon')}
                />
            </div>
            <DropDown>
                <div className={cx('ace-c-input-time__drop-down')}>
                    <List
                        name={`${name}List`}
                        isComposedIn={true}
                        onChange={handleListOnChange}
                    >
                        {filteredTimeOptions.map(time => (
                            <Option
                                key={time}
                                name={`option-${time}`}
                                value={time}
                            >
                                {time}
                            </Option>
                        ))}
                    </List>
                </div>
            </DropDown>
        </Fragment>
    );
});

InputTime.displayName = 'InputTime';

InputTime.propTypes = {
    ...withFormContextPropTypes,
    onOptionSelect: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.object,
};

InputTime.defaultProps = {
    ...withFormContextDefaultProps,
    onOptionSelect: null,
    placeholder: '',
    icon: arrowDownIcon,
};

export default withFormContext(withDropDownProvider(InputTime));
