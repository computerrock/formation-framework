import React, {Children} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './InputLabel.module.scss';

const InputLabel = ({cx, children, errors, name}) => {
    const {cx} = useStyles(props, styles);
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isError: errors.length,
        });
    });
    return (
        <label
            className={cx('ace-c-input-label', {
                'ace-c-input-label--is-error': errors.length,
            })}
            htmlFor={name}
        >
            {enhancedChildren}
        </label>
    );
};

InputLabel.propTypes = {
    ...withFormContextPropTypes,
};

InputLabel.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext(InputLabel);
