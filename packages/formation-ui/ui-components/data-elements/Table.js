import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Table.module.scss';
import useQAIdent from '../useQAIdent';
import TableContext from './TableContext';

const Table = props => {
    const {cx} = useStyles(props, styles);
    const {name, children} = props;
    const {qaIdent, qaIdentPart} = useQAIdent(props, {qaIdentRoot: 'table', qaIdent: props.qaIdent || name});

    return (
        <table className={cx('ace-c-table')} data-qa={qaIdent}>
            <TableContext.Provider
                value={{
                    tableName: name || undefined,
                    qaIdentPart,
                }}
            >
                {children}
            </TableContext.Provider>
        </table>
    );
};

Table.propTypes = {
    name: PropTypes.string,
    qaIdent: PropTypes.string,
};

Table.defaultProps = {
    name: null,
    qaIdent: '',
};

export default Table;
