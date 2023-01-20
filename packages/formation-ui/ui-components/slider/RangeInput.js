import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import styles from './RangeInput.module.scss';
import './RangeInput.scss';
import useStyles from '../useStyles';

const RangeInput = props => {
    const {cx} = useStyles(props, styles);
    const {value, onChange, className, isDisabled} = props;
    const {minValue, maxValue, step, hasStepIndicator} = props;

    const handleOnChange = value => {
        if (typeof onChange === 'function') onChange(value);
    };

    return (
        <div
            className={cx('ace-c-range-input__wrapper', className, {
                'ace-c-range-input--is-disabled': isDisabled,
            })}
        >
            <Slider
                range
                prefixCls="ace-c-range-input"
                min={minValue}
                max={maxValue}
                value={value}
                step={hasStepIndicator ? null : step}
                onChange={handleOnChange}
                handleRender={renderProps => {
                    return (
                        <div {...renderProps.props}>
                            <span
                                className={cx('ace-c-range-input-handle__text')}
                            >{`${renderProps.props['aria-valuenow']}€`}
                            </span>
                        </div>
                    );
                }}
                disabled={isDisabled}
            />
        </div>
    );
};

RangeInput.propTypes = {
    ...withFormContextPropTypes,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
    hasStepIndicator: PropTypes.bool,
};

RangeInput.defaultProps = {
    ...withFormContextDefaultProps,
    className: '',
    minValue: 0,
    maxValue: 0,
    step: 1,
    hasStepIndicator: false,
};

export default withFormContext(RangeInput);
