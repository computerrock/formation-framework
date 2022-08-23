import React, {useContext} from 'react';
import useStyles from '../useStyles';
import styles from './Table.module.scss';
import TableContext from './TableContext';

const TableCaption = props => {
    const {cx} = useStyles(props, styles, {setClassNameToBEMElement: true});
    const {children} = props;
    const {qaIdentPart} = useContext(TableContext);

    return (
        <caption
            className={cx('ace-c-table__caption')}
            data-qa={qaIdentPart('caption', props)}
        >
            {children}
        </caption>
    );
};

export default TableCaption;
