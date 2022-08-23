import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import {plusIcon, minusIcon, SVGSpriteSymbol} from '../icons/index';
import useStyles from '../useStyles';
import styles from './InputCounter.module.scss';

const InputCounter = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {label, className} = props;
    const {name, value, onChange, isDisabled, isLimitationAchieved, qaIdent} = props;

    const intValue = typeof value === 'string' ? +value : value;

    const convertValueType = newValue => {
        return typeof value === 'string' ? newValue.toString() : newValue;
    };

    const decrementCounter = () => {
        const newValue = intValue > 0 ? intValue - 1 : intValue;
        onChange(convertValueType(newValue));
    };

    const incrementCounter = () => {
        const newValue = intValue + 1;
        onChange(convertValueType(newValue));
    };

    return (
        <div
            ref={ref}
            className={cx('ace-c-input-counter', [className])}
            data-qa={qaIdent}
        >
            <span className={cx('ace-c-input-counter__label')}>
                {label}
            </span>
            <div className={cx('ace-c-input-counter__controls')}>
                <button
                    className={cx('ace-c-input-counter__minus-button', {
                        'ace-c-input-counter__minus-button--is-disabled': intValue === 0 || isDisabled,
                        'ace-c-input-counter--is-disabled': intValue === 0 || isDisabled,
                    })}
                    type="button"
                    onClick={decrementCounter}
                    disabled={isDisabled}
                >
                    <SVGSpriteSymbol
                        spriteSymbol={minusIcon}
                        className={cx('ace-c-input-counter__minus-icon')}
                    />
                </button>
                <input
                    className={cx('ace-c-input-counter__button__input')}
                    name={name}
                    value={intValue}
                    disabled={true}
                    maxLength={2}
                    size={2}
                />
                <button
                    className={cx('ace-c-input-counter__plus-button', {
                        'ace-c-input-counter__minus-button--is-disabled': isLimitationAchieved || isDisabled,
                        'ace-c-input-counter--is-disabled': isLimitationAchieved || isDisabled,
                    })}
                    type="button"
                    onClick={incrementCounter}
                    disabled={isDisabled || isLimitationAchieved}
                >
                    <SVGSpriteSymbol
                        spriteSymbol={plusIcon}
                        className={cx('ace-c-input-counter__plus-icon')}
                    />
                </button>
            </div>
        </div>
    );
});

InputCounter.propTypes = {
    ...withFormContextPropTypes,
    label: PropTypes.string,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

InputCounter.defaultProps = {
    ...withFormContextDefaultProps,
    label: '',
    className: [],
};

export default withFormContext({componentName: 'InputCounter'})(InputCounter);
