import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class SVGSpriteSymbol extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        spriteSymbol: PropTypes.object.isRequired,
    };

    static defaultProps = {
        className: '',
    };

    render() {
        const {className, spriteSymbol, ...restProps} = this.props;
        return (
            <svg viewBox={spriteSymbol.viewBox} className={`cr-c-sprite-symbol ${className}`} {...restProps}>
                <use xlinkHref={spriteSymbol.url} />
            </svg>
        );
    }
}
