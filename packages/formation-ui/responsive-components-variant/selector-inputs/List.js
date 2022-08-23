import React from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './List.module.scss';

const List = React.forwardRef((props, ref) => {
    const {children} = props;
    const {cx} = useStyles(props, styles);

    return (
        <div
            ref={ref}
            className={cx('ace-c-list')}
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

export default withFormContext({isSelectableGroup: true, isMultipleChoice: false})(List);
