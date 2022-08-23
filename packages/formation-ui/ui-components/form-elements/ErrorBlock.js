import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './ErrorBlock.module.scss';

const ErrorBlock = props => {
    const {cx} = useStyles(props, styles);
    const {children, fieldRef, isValid, errors, qaIdent} = props;
    return !isValid ? (
        <div ref={fieldRef} className={cx('ace-c-error-block')} data-qa={qaIdent}>
            <label className={cx('ace-c-error-block__label')}>
                {errors.map(error => error)}
            </label>
            <div className={cx('ace-c-error-block__content')}>
                {children}
            </div>
        </div>
    ) : children;
};

ErrorBlock.propTypes = {
    ...withFormContextPropTypes,
};

ErrorBlock.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'ErrorBlock', isValidationGroup: true})(ErrorBlock);
