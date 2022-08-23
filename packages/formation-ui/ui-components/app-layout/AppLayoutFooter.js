import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './AppLayout.module.scss';

const AppLayoutFooter = props => {
    const {children, contentClassName} = props;
    const {cx} = useStyles(props, styles);

    return (
        <div className={cx('ace-c-app-layout__footer')}>
            <div className={cx('ace-c-app-layout__footer-content', contentClassName)}>
                {children}
            </div>
        </div>
    );
};

AppLayoutFooter.propTypes = {
    // contentClassName may be used for assigning utility classes that apply
    // to content container of the panel. Eg. ace-u-flex, ace-u-grid, ...
    contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

AppLayoutFooter.defaultProps = {
    contentClassName: '',
};

export default AppLayoutFooter;
