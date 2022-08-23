import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import SVGSpriteSymbol from '../icons/SVGSpriteSymbol';
import styles from './ButtonContent.module.scss';

const ButtonContent = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {icon, iconPosition, isDisabled} = props;

    return (
        <div
            ref={ref}
            className={cx('ace-c-button-content', {
                'ace-c-button-content--is-disabled': isDisabled,
            })}
        >
            {iconPosition === 'left' && (
            <SVGSpriteSymbol
                spriteSymbol={icon}
                className={cx('ace-c-button-content__icon ace-c-button-content__icon--left')}
            />
            )}
            {props.children}
            {iconPosition === 'right' && (
                <SVGSpriteSymbol
                    spriteSymbol={icon}
                    className={cx('ace-c-button-content__icon ace-c-button-content__icon--right')}
                />
            )}
        </div>
    );
});

ButtonContent.propTypes = {
    isDisabled: PropTypes.bool,
    icon: PropTypes.object,
    iconPosition: PropTypes.oneOf(['left', 'right']),
};

ButtonContent.defaultProps = {
    isDisabled: undefined,
    icon: null,
    iconPosition: 'left',
};

export default ButtonContent;
