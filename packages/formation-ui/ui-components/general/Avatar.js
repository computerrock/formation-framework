import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Avatar.module.scss';
import scssVariables from './avatar-config.module.scss';

const AVATAR_COLORS = Object.values(scssVariables);

const Avatar = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {src, alt, onClick} = props;
    const avatarRef = useRef();
    const imageRef = useRef();
    const spanRef = useRef();

    const numberFromText = text => {
        const charCodes = text
            .split('')
            .map(char => char.charCodeAt(0))
            .join('');
        return parseInt(charCodes, 10);
    };

    const hideImageAndShowInitials = () => {
        imageRef.current.style.display = 'none';
        spanRef.current.style.display = 'inline';
        const activeAvatarRef = ref || avatarRef;
        activeAvatarRef.current.style.backgroundColor = AVATAR_COLORS[numberFromText(alt.toUpperCase())
            % AVATAR_COLORS.length];
    };

    return (
        <div
            ref={ref || avatarRef}
            className={cx('ace-c-avatar', {
                'ace-c-avatar--is-clickable': typeof onClick === 'function',
            })}
            onClick={onClick}
        >
            <img
                ref={imageRef}
                className={cx('ace-c-avatar__img')}
                src={src}
                alt={alt}
                onError={hideImageAndShowInitials}
            />
            <span ref={spanRef} className={cx('ace-c-avatar__initials')}>{alt}</span>
        </div>
    );
});

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

Avatar.defaultProps = {
    src: '',
    onClick: null,
};

export default Avatar;
