import React from 'react';
import PropTypes from 'prop-types';
import HighlightCircle from '../general/HighlightCircle';
import useStyles from '../useStyles';

const NoResultsBlock = props => {
    const {cx} = useStyles();
    const {message, description, icon, variant, children} = props;

    return (
        <div
            className={cx([
                'global!ace-u-flex',
                'global!ace-u-flex--direction-column',
                'global!ace-u-flex--align-center',
                'global!ace-u-padding--48-0',
            ])}
        >
            <HighlightCircle
                className={cx([`ace-c-highlight-circle--${variant}`, 'global!ace-u-margin--bottom-32'])}
            >
                {icon}
            </HighlightCircle>
            <p
                className={cx([
                    'global!ace-u-typography--variant-h3',
                    'global!ace-u-typography--color-medium-emphasis',
                ])}
            >
                {message}
            </p>
            {!!description && (
                <p
                    className={cx([
                        'global!ace-u-margin--top-16',
                        'global!ace-u-typography--variant-body',
                        'global!ace-u-typography--color-medium-emphasis',
                    ])}
                >
                    {description}
                </p>
            )}
            {children}
        </div>
    );
};

NoResultsBlock.propTypes = {
    icon: PropTypes.node.isRequired,
    message: PropTypes.string.isRequired,
    description: PropTypes.string,
    variant: PropTypes.oneOf(['regular', 'large', 'medium']),
};

NoResultsBlock.defaultProps = {
    description: '',
    variant: 'large',
};

export default NoResultsBlock;
