import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './TextArea.module.scss';

const TextArea = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {name, value, isDisabled} = props;
    const {placeholder, maxLength} = props;
    const {rows, cols, isResizable, onBlur} = props;
    const {onChange} = props;
    const {isReadOnly, isRequired, errors, qaIdent} = props;

    const handleOnChange = event => {
        if (typeof onChange === 'function') onChange(event.target.value);
    };

    const handleOnBlur = event => {
        if (typeof onBlur === 'function') onBlur(event);
    };

    return (
        <textarea
            ref={ref}
            name={name}
            maxLength={maxLength}
            rows={rows}
            cols={cols}
            value={value}
            placeholder={placeholder}
            onChange={handleOnChange}
            readOnly={isReadOnly}
            disabled={isDisabled}
            onBlur={handleOnBlur}
            className={cx('ace-c-text-area', {
                'ace-c-text-area--is-disabled': isDisabled,
                'ace-c-text-area--has-error': errors.length,
                'ace-c-text-area--is-required': isRequired && value === '',
                'ace-c-text-area--not-resizable': !isResizable && isResizable !== 'undefined',
            })}
            data-qa={qaIdent}
        />
    );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
    ...withFormContextPropTypes,
    isResizable: PropTypes.bool,
    onBlur: PropTypes.func,
};

TextArea.defaultProps = {
    ...withFormContextDefaultProps,
    isResizable: true,
    onBlur: null,
};

export default withFormContext({componentName: 'TextArea'})(TextArea);
