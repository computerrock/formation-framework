import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

export const withStyles = styles => BaseComponent => {
    const ComposedComponent = React.forwardRef((props, ref) => {
        const {classNames, createClassNameResolver} = useStyles(props, styles);
        const {classNameResolver, ...restProps} = props;

        return (
            <BaseComponent
                {...restProps}
                ref={ref}
                cx={classNames}
                createClassNameResolver={createClassNameResolver}
            />
        );
    });

    ComposedComponent.displayName = `withStyles(${BaseComponent.displayName || BaseComponent.name})`;

    ComposedComponent.propTypes = {
        ...BaseComponent.propTypes,
        classNameResolver: PropTypes.func,
    };

    ComposedComponent.defaultProps = {
        ...BaseComponent.defaultProps,
        classNameResolver: null,
    };

    return ComposedComponent;
};

export const withStylesPropTypes = {
    cx: PropTypes.func,
    createClassNameResolver: PropTypes.func,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    classNameResolver: PropTypes.func,
};

export const withStylesDefaultProps = {
    cx: () => null,
    createClassNameResolver: () => null,
    className: '',
    classNameResolver: null,
};
