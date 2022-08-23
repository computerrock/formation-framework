import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import {withFormContextPropTypes, withFormContextDefaultProps, withFormContext} from '../form/withFormContext';
import styles from './InputCurrency.module.scss';
import Input from './Input';

const InputCurrency = props => {
    const {cx} = useStyles(props, styles);
    const {value, errors, isDisabled} = props;
    return (
        <div className={cx('ace-c-input-currency', {
            'ace-c-input-currency--not-full-width': props.name === 'requestedInvoicingAmount',
        })}
        >
            <Input
                className={cx('ace-c-input-currency__input')}
                {...props}
                isCurrency
            />
            <p className={cx('ace-c-input-currency__sign', {
                'ace-c-input-currency__sign--is-disabled': isDisabled,
                'ace-c-input-currency__sign--has-error': errors.length,
                'ace-c-input-currency__sign--empty': !value,
            })}
            >EUR
            </p>
        </div>
    );
};

Input.displayName = 'InputCurrency';

InputCurrency.propTypes = {
    ...withFormContextPropTypes,
    placeholder: PropTypes.string,
    isAutoCompleteOff: PropTypes.bool,
    type: PropTypes.string,
};

InputCurrency.defaultProps = {
    ...withFormContextDefaultProps,
    placeholder: '',
    isAutoCompleteOff: false,
    type: 'text',
};

export default withFormContext(InputCurrency);
