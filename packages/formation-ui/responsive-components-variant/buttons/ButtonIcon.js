import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './ButtonIcon.module.scss';
import ButtonPrimary from './ButtonPrimary';
import SVGSpriteSymbol from '../icons/SVGSpriteSymbol';

const ButtonIcon = React.forwardRef((props, ref) => {
    const {cx, createClassNameResolver} = useStyles(props, styles);
    const {children, icon, ...restProps} = props;
    const classNameResolver = createClassNameResolver('ace-c-button-icon');

    return (
        <ButtonPrimary
            ref={ref}
            classNameResolver={classNameResolver}
            className={cx('ace-c-button-primary')}
            {...restProps}
        >
            <Fragment>
                <SVGSpriteSymbol
                    spriteSymbol={icon}
                    className={cx('ace-c-button-icon__icon', {'ace-c-button-icon__icon__upload--mobile': icon.id === 'symbol-add-usage'})}
                />
            </Fragment>
            {children}
        </ButtonPrimary>
    );
});

ButtonIcon.displayName = 'ButtonIcon';

ButtonIcon.propTypes = {
    icon: PropTypes.object.isRequired,
};

export default ButtonIcon;
