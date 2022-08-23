import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import SVGSpriteSymbol from './SVGSpriteSymbol';
import styles from './Icon.module.scss';

const Icon = props => {
    const {cx} = useStyles(props, styles);
    const {icon, onClick} = props;

    const handleOnClick = event => {
        if (typeof onClick === 'function') {
            onClick(event);
        }
    };

    return (
        <i
            className={cx('ace-c-icon', {
                'ace-c-icon--has-on-click': typeof onClick === 'function',
            })}
            onClick={handleOnClick}
        >
            <SVGSpriteSymbol
                className={cx('ace-c-icon__symbol')}
                spriteSymbol={icon}
            />
        </i>
    );
};

Icon.propTypes = {
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

Icon.defaultProps = {
    onClick: null,
};

export default Icon;
