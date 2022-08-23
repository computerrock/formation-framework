import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import SVGSpriteSymbol from '../icons/SVGSpriteSymbol';
import styles from './ButtonGhostContent.module.scss';

const ButtonGhostContent = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {isDisabled, isHighlighted, isFocused} = props;
    const {icon, iconPosition} = props;

    return (
        <div
            ref={ref}
            className={cx('ace-c-button-ghost-content', {
                'ace-c-button-ghost-content--is-disabled': isDisabled,
                'ace-c-button-ghost-content--is-highlighted': isHighlighted,
                'ace-c-button-ghost-content--is-focused': isFocused,
            })}
        >
            {iconPosition === 'left' && (
                <SVGSpriteSymbol
                    spriteSymbol={icon}
                    className={cx('ace-c-button-ghost-content__icon ace-c-button-ghost-content__icon--left')}
                />
            )}
            {props.children}
            {iconPosition === 'right' && (
                <SVGSpriteSymbol
                    spriteSymbol={icon}
                    className={cx('ace-c-button-ghost-content__icon ace-c-button-ghost-content__icon--right')}
                />
            )}
        </div>
    );
});

ButtonGhostContent.propTypes = {
    isDisabled: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    isFocused: PropTypes.bool,
    icon: PropTypes.object,
    iconPosition: PropTypes.oneOf(['left', 'right']),
};

ButtonGhostContent.defaultProps = {
    isDisabled: false,
    isHighlighted: false,
    isFocused: false,
    icon: null,
    iconPosition: 'left',
};

export default ButtonGhostContent;
