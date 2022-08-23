import React, {useContext, Children} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import TabSetContext from './TabSetContext';
import styles from './Tab.module.scss';
import Selector from '../selector-inputs/Selector';

const Tab = React.forwardRef((props, ref) => {
    const {cx, createClassNameResolver} = useStyles(props, styles);
    const {children, name, ...restProps} = props;
    const {isSelected, isDisabled, qaIdent} = props;
    const {qaIdentPart} = useContext(TabSetContext);
    const classNameResolver = createClassNameResolver('ace-c-tab');

    // bind state to children
    const enhancedChildren = Children.map(children, child => {
        if (!child || typeof child === 'string' || typeof child.type === 'string') return child;

        return React.cloneElement(child, {
            isSelected: isSelected,
            isDisabled: isDisabled,
        });
    });

    return (
        <Selector
            {...restProps}
            ref={ref}
            name={`${name}Selector`}
            isComposedIn={true}
            classNameResolver={classNameResolver}
            className={cx('ace-c-selector', {
                'ace-c-selector--is-selected': isSelected,
                'ace-c-selector--is-disabled': isDisabled,
            })}
            qaIdent={qaIdentPart(`tab-${name}`, props) || qaIdent}
        >
            {enhancedChildren}
        </Selector>
    );
});

Tab.displayName = 'Tab';

Tab.propTypes = {
    ...withFormContextPropTypes,
    additionalSearchQueryParams: PropTypes.object,
};

Tab.defaultProps = {
    ...withFormContextDefaultProps,
    additionalSearchQueryParams: null,
};

export default withFormContext({componentName: 'Tab', isSelectable: true})(Tab);
