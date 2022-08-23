import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import useQAIdent from '../useQAIdent';
import styles from './Panel.module.scss';
import Badge from '../general/Badge';

const Panel = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {qaIdent, qaIdentPart} = useQAIdent(props, {qaIdentRoot: 'panel'});
    const {children, header, title, actions, contentClassName, hasBadge, notifications} = props;

    return (
        <div className={cx('ace-c-panel')} data-qa={qaIdent}>
            <div className={cx('ace-c-panel__header')}>
                {header && (
                    <div
                        className={cx('ace-c-panel__header-main')}
                        data-qa={qaIdentPart('header')}
                    >
                        {header}
                    </div>
                )}
                {title && !header && (
                    <div
                        className={cx('ace-c-panel__header-main', 'ace-c-panel__header-main--title')}
                        data-qa={qaIdentPart('title')}
                    >
                        {title}
                        {hasBadge
                            ? (
                                <Badge
                                    className={cx([
                                        'ace-c-badge--status-notification',
                                        'global!ace-u-margin--left-8',
                                    ])}
                                >
                                    {notifications}
                                </Badge>
                            ) : null
                        }
                    </div>
                )}
                {actions && (
                    <div
                        className={cx('ace-c-panel__header-actions')}
                        data-qa={qaIdentPart('actions')}
                    >
                        {actions}
                    </div>
                )}
            </div>

            <div
                ref={ref}
                className={cx('ace-c-panel__content', contentClassName)}
                data-qa={qaIdentPart('content')}
            >
                {children}
            </div>
        </div>
    );
});

Panel.propTypes = {
    // contentClassName may be used for assigning utility classes that apply
    // to content container of the panel. Eg. ace-u-flex, ace-u-grid, ...
    contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    header: PropTypes.node,
    title: PropTypes.node,
    actions: PropTypes.node,
    hasBadge: PropTypes.bool,
    notifications: PropTypes.string,
};

Panel.defaultProps = {
    contentClassName: '',
    header: null,
    title: null,
    actions: null,
    hasBadge: false,
    notifications: '',
};

export default Panel;
