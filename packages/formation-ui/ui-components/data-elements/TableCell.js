import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import useStyles from '../useStyles';
import styles from './Table.module.scss';

const TableCell = props => {
    const {cx} = useStyles(props, styles, {setClassNameToBEMElement: true});
    const {children, colSpan, rowSpan} = props;
    const {qaIdentPart} = useContext(TableContext);

    return (
        <td
            className={cx('ace-c-table__cell')}
            colSpan={colSpan}
            rowSpan={rowSpan}
            data-qa={qaIdentPart('cell', props)}
        >
            {children}
        </td>
    );
};

TableCell.propTypes = {
    colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rowSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

TableCell.defaultProps = {
    colSpan: null,
    rowSpan: null,
};

export default TableCell;
