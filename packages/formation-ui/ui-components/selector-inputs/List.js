import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './List.module.scss';

const List = React.forwardRef((props, ref) => {
    const {children, qaIdent} = props;
    const {cx} = useStyles(props, styles);

    return (
        <div
            ref={ref}
            className={cx('ace-c-list')}
            data-qa={qaIdent}
        >
            {children}
        </div>
    );
});

List.displayName = 'List';

List.propTypes = {
    ...withFormContextPropTypes,
};

List.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'List', isSelectableGroup: true, isMultipleChoice: false})(List);
