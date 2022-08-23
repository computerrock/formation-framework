import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import useStyles from '../useStyles';
import styles from './Table.module.scss';

const TableRow = props => {
    const {cx} = useStyles(props, styles, {setClassNameToBEMElement: true});
    const {children, onClick} = props;
    const {qaIdentPart} = useContext(TableContext);

    return (
        <tr
            className={cx('ace-c-table__row', {
                'ace-c-table__row--has-on-click': typeof onClick === 'function',
            })}
            onClick={() => (typeof onClick === 'function' ? onClick() : null)}
            data-qa={qaIdentPart('row', props)}
        >
            {children}
        </tr>
    );
};

TableRow.propTypes = {
    onClick: PropTypes.func,
};

TableRow.defaultProps = {
    onClick: null,
};

export default TableRow;
