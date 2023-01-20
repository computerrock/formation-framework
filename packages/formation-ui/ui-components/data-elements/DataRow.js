import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import useQAIdent from '../useQAIdent';
import styles from './DataRow.module.scss';

const DataRow = props => {
    const {cx} = useStyles(props, styles);
    const {qaIdent, qaIdentPart} = useQAIdent(props, {qaIdentRoot: 'data-row'});
    const {children, label, contentClassName, isFieldRequired} = props;

    return (
        <div className={cx('ace-c-data-row')} data-qa={qaIdent}>
            <div
                className={cx('ace-c-data-row__label', {
                    'ace-c-data-row__label--is-field-required': isFieldRequired,
                })}
                data-qa={qaIdentPart('label')}
            >
                {label}
                {isFieldRequired
                    ? <span className={cx('ace-c-data-row__span')}>*</span>
                    : null}
            </div>
            <div
                className={cx('ace-c-data-row__content', contentClassName)}
                data-qa={qaIdentPart('content')}
            >
                {children}
            </div>
        </div>
    );
};

DataRow.propTypes = {
    // contentClassName may be used for assigning utility classes that apply
    // to content container of the panel. Eg. ace-u-flex, ace-u-grid, ...
    contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    label: PropTypes.node,
    isFieldRequired: PropTypes.bool,
};

DataRow.defaultProps = {
    contentClassName: '',
    label: null,
    isFieldRequired: false,
};

export default DataRow;
