import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';

const SVGSpriteSymbol = props => {
    const {cx} = useStyles(props);
    const {spriteSymbol} = props;

    // return if no spriteSymbol
    if (!spriteSymbol) return null;

    return (
        <svg
            className={cx()}
            viewBox={spriteSymbol.viewBox}
        >
            <use xlinkHref={spriteSymbol.url} />
        </svg>
    );
};

SVGSpriteSymbol.propTypes = {
    spriteSymbol: PropTypes.object.isRequired,
};

export default SVGSpriteSymbol;
