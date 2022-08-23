import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import SVGSpriteSymbol from '../icons/SVGSpriteSymbol';
import styles from './ButtonPrimaryContent.module.scss';

const ButtonPrimaryContent = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {isDisabled, icon, iconPosition, children} = props;

    return (
        <div
            ref={ref}
            className={cx('ace-c-button-primary-content', {
                'ace-c-button-primary-content--is-disabled': isDisabled,
            })}
        >
            {iconPosition === 'left' && (
                <SVGSpriteSymbol
                    spriteSymbol={icon}
                    className={cx('ace-c-button-primary-content__icon ace-c-button-primary-content__icon--left')}
                />
            )}
            {children}
            {iconPosition === 'right' && (
                <SVGSpriteSymbol
                    spriteSymbol={icon}
                    className={cx('ace-c-button-primary-content__icon ace-c-button-primary-content__icon--right')}
                />
            )}
        </div>
    );
});

ButtonPrimaryContent.propTypes = {
    isDisabled: PropTypes.bool,
    icon: PropTypes.object,
    iconPosition: PropTypes.oneOf(['left', 'right']),
};

ButtonPrimaryContent.defaultProps = {
    isDisabled: undefined,
    icon: null,
    iconPosition: 'left',
};

export default ButtonPrimaryContent;
