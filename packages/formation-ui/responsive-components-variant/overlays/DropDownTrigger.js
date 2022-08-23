import React, {Children, Fragment, useContext} from 'react';
import DropDownContext from './DropDownContext';
import withDropDownProvider from './withDropDownProvider';

const DropDownTrigger = ({children}) => {
    const {dropDownTriggerRef, toggleDropDown} = useContext(DropDownContext);

    // bind trigger to first child
    const enhancedChildren = [];
    Children.forEach(children, (child, index) => {
        if (!child || typeof child === 'string') return child;

        enhancedChildren.push(React.cloneElement(child, {
            key: index,
            ...(index === 0 && {
                onClick: () => {
                    toggleDropDown();
                    if (typeof child.props.onClick === 'function') child.props.onClick();
                },
                ref: dropDownTriggerRef,
            }),
        }));
    });

    return (
        <Fragment>
            {enhancedChildren}
        </Fragment>
    );
};

export default withDropDownProvider(DropDownTrigger);
