import React from 'react';
import DropDownProvider from './DropDownProvider';

const withDropDownProvider = BaseComponent => {
    const ComposedComponent = React.forwardRef((props, ref) => {
        return (
            <DropDownProvider baseComponentRef={ref}>
                <BaseComponent {...props} ref={ref} />
            </DropDownProvider>
        );
    });

    ComposedComponent.displayName = `withDropDownProvider(${BaseComponent.displayName || BaseComponent.name})`;

    ComposedComponent.propTypes = {
        ...BaseComponent.propTypes,
    };

    ComposedComponent.defaultProps = {
        ...BaseComponent.defaultProps,
    };

    return ComposedComponent;
};

export default withDropDownProvider;
