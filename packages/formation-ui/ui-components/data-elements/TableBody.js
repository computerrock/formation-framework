import React, {Children, useContext} from 'react';
import TableContext from './TableContext';
import useStyles from '../useStyles';
import styles from './Table.module.scss';

const TableBody = props => {
    const {cx} = useStyles(props, styles);
    const {children} = props;
    const {qaIdentPart} = useContext(TableContext);

    // bind tbody style to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string') return child;

        let className = ['ace-c-table__row--body'];
        if (child.props?.className) {
            className = typeof child.props.className === 'string'
                ? [...className, child.props.className]
                : className.concat(child.props.className);
        }

        return React.cloneElement(child, {
            className,
        });
    });

    return (
        <tbody
            className={cx('ace-c-table__body')}
            data-qa={qaIdentPart('tbody')}
        >
            {enhancedChildren}
        </tbody>
    );
};

export default TableBody;
