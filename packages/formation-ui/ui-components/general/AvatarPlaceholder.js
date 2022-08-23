import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './AvatarPlaceholder.module.scss';

const AvatarPlaceholder = props => {
    const {cx} = useStyles(props, styles);
    const {onClick} = props;

    return (
        <div
            className={cx('ace-c-avatar-placeholder', {
                'ace-c-avatar--is-clickable': typeof onClick === 'function',
            })}
            onClick={onClick}
        />
    );
};

AvatarPlaceholder.propTypes = {
    onClick: PropTypes.func,
};

AvatarPlaceholder.defaultProps = {
    onClick: null,
};

export default AvatarPlaceholder;
