import React, {Children, useContext} from 'react';
import TableContext from './TableContext';
import useStyles from '../useStyles';
import styles from './Table.module.scss';

const TableHead = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    const {qaIdentPart} = useContext(TableContext);

    // bind thead style to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string') return child;

        return React.cloneElement(child, {
            className: 'ace-c-table__row--head',
        });
    });

    return (
        <thead
            className={cx('ace-c-table__head')}
            data-qa={qaIdentPart('thead')}
        >
            {enhancedChildren}
        </thead>
    );
};

export default TableHead;
