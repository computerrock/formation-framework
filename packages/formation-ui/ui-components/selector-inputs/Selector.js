import React, {Children, useRef, useContext} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import SelectableContext from '../form/SelectableContext';
import useStyles from '../useStyles';
import styles from './Selector.module.scss';

const Selector = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, className} = props;
    const {onChange, isSelected, defaultIsSelected, isDisabled, qaIdent} = props;
    const {isSelectableGroupMultipleChoice} = useContext(SelectableContext);
    const uncontrolledIsSelectedRef = useRef(typeof defaultIsSelected !== 'undefined' ? defaultIsSelected : false);
    uncontrolledIsSelectedRef.current = isSelected;

    const handleOnClick = () => {
        if (!isSelectableGroupMultipleChoice && uncontrolledIsSelectedRef.current === true) return;

        uncontrolledIsSelectedRef.current = !uncontrolledIsSelectedRef.current;
        if (typeof onChange === 'function') onChange(uncontrolledIsSelectedRef.current);
    };

    // bind state to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isSelected: isSelected,
            isDisabled: isDisabled,
        });
    });

    return (
        <div
            ref={ref}
            onClick={handleOnClick}
            className={cx('ace-c-selector', className)}
            data-qa={qaIdent}
        >
            {enhancedChildren}
        </div>
    );
});

Selector.displayName = 'Selector';

Selector.propTypes = {
    ...withFormContextPropTypes,
};

Selector.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'Selector', isSelectable: true})(Selector);
