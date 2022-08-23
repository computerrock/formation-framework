import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './FileInput.module.scss';

const FileInput = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, name, onChange, isDisabled, isMultiple, qaIdent} = props;

    const handleOnChange = event => {
        if (event.target.files
            && event.target.files.length > 0) {
            onChange(event.target.files);
        }
    };

    return (
        <label
            className={cx('ace-c-file-input', {
                'ace-c-file-input--is-disabled': isDisabled,
            })}
        >
            <input
                ref={ref}
                className={cx('ace-c-file-input__native-input')}
                type="file"
                name={name}
                disabled={isDisabled}
                multiple={isMultiple}
                onChange={handleOnChange}
                data-qa={qaIdent}
            />
            {/* TODO design system elements & styling for FileInput */}
            {children}
        </label>
    );
});

FileInput.displayName = 'FileInput';

FileInput.propTypes = {
    ...withFormContextPropTypes,
    isMultiple: PropTypes.bool,
};

FileInput.defaultProps = {
    ...withFormContextDefaultProps,
    isMultiple: true,
};

export default withFormContext({componentName: 'FileInput', isFileUpload: true})(FileInput);
