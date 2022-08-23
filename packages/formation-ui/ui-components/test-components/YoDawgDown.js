import React, {Fragment, useContext, useState} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './YoDawgDown.module.scss';
import DropDownContext from '../overlays/DropDownContext';
import DropDown from '../overlays/DropDown';
import withDropDownProvider from '../overlays/withDropDownProvider';
import Select from '../selector-inputs/Select';
import Option from '../selector-inputs/Option';

const YoDawgDown = React.forwardRef((props, ref) => {
    // `dropDownTriggerRef` matches forwarded `ref` if present
    const {dropDownTriggerRef, toggleDropDown, isOpen} = useContext(DropDownContext);
    const {cx} = useStyles(props, styles);
    const {isDisabled} = props;
    const [innerSelectValue, setInnerSelectValue] = useState('option1');

    return (
        <Fragment>
            <div
                className={cx('ace-c-yo-dawg-down', {
                    'ace-c-yo-dawg-down--is-disabled': isDisabled,
                    'ace-c-yo-dawg-down--is-open': isOpen,
                })}
                ref={dropDownTriggerRef}
                onClick={toggleDropDown}
            >
                Yo Dawg!
            </div>
            <DropDown>
                <div className={cx('ace-c-yo-dawg-down__drop-down')}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />Heard you like DropDowns...<br />
                    <Select
                        placeholder=""
                        isComposedIn={true}
                        className="ace-c-select--small"
                        value={innerSelectValue}
                        onChange={value => setInnerSelectValue(value)}
                    >
                        <Option name="select1-option1" value="option1" className="ace-c-option-small">
                            so I put a DropDown...
                        </Option>
                        <Option name="select1-option2" value="option2" className="ace-c-option-small">
                            ...in your DropDown,
                        </Option>
                        <Option name="select1-option3" value="option3" className="ace-c-option-small">
                            so you can open a DropDown,
                        </Option>
                        <Option name="select1-option4" value="option4" className="ace-c-option-small">
                            while opening a DropDown.
                        </Option>
                    </Select>
                </div>
            </DropDown>
        </Fragment>
    );
});

YoDawgDown.displayName = 'YoDawgDown';

YoDawgDown.propTypes = {
    ...withFormContextPropTypes,
};

YoDawgDown.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext(withDropDownProvider(YoDawgDown));
