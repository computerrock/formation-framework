import React, {useState} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import Input from './Input';
import styles from './InputWithButton.module.scss';
import useStyles from '../useStyles';
import ButtonPrimary from '../buttons/ButtonPrimary';

const InputWithButton = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, buttonType, buttonOnClick, qaIdent, ...restProps} = props;
    const {isDisabled, errors, name} = restProps;

    const [isInputInFocus, setIsInputInFocus] = useState(false);

    return (
        <div className={cx('ace-c-input-with-button')} data-qa={qaIdent}>
            <div
                className={cx('ace-c-input-with-button__content', {
                    'ace-c-input-with-button__content--focused': isInputInFocus,
                    'ace-c-input-with-button__content--error': errors.length,
                })}
            >
                <Input
                    className={cx('ace-c-input-with-button__input')}
                    ref={ref}
                    {...restProps}
                    isDisabled={isDisabled}
                    isComposedIn={true}
                    onFocus={() => setIsInputInFocus(true)}
                    onBlur={() => setIsInputInFocus(false)}
                />
                <ButtonPrimary
                    className={cx('ace-c-input-with-button__button')}
                    type={buttonType}
                    onClick={buttonOnClick}
                    isComposedIn={true}
                    isDisabled={isDisabled}
                    name={name}
                >
                    {children}
                </ButtonPrimary>
            </div>
        </div>

    );
});

InputWithButton.displayName = 'InputWithButton';

InputWithButton.propTypes = {
    ...withFormContextPropTypes,
};

InputWithButton.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'InputWithButton'})(InputWithButton);
