import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServiceCategoryTitle.module.scss';
import useStyles from '../useStyles';
import {Icon} from '../icons';

const ServiceCategoryTitle = props => {
    const {cx} = useStyles(props, styles);
    const {icon, children} = props;
    return (
        <div className={cx('ace-c-service-category-title')}>
            <Icon
                className={cx([
                    'ace-c-icon--24',
                    'ace-c-icon--color-highlight',
                    'ace-c-service-category-title__icon',
                ])}
                icon={icon}
            />
            <p className={cx('ace-c-service-category-title__title')}>{children}</p>
        </div>
    );
};

ServiceCategoryTitle.propTypes = {
    icon: PropTypes.object.isRequired,
};

export default ServiceCategoryTitle;
