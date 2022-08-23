import React from 'react';
import PropTypes from 'prop-types';
import styles from './SectionDetails.module.scss';
import useStyles from '../useStyles';
import {editIcon, Icon} from '../icons';

const SectionDetails = props => {
    const {cx} = useStyles(props, styles);
    const {children, onEditDetails} = props;

    return (
        <div className={cx('ace-c-section-details')}>
            <div className={cx('ace-c-section-details__details')}>
                {children}
            </div>
            <Icon className={cx('ace-c-section-details__icon')} onClick={onEditDetails} icon={editIcon} />
        </div>
    );
};

SectionDetails.propTypes = {
    onEditDetails: PropTypes.func,
};

SectionDetails.defaultProps = {
    onEditDetails: () => {},
};

export default SectionDetails;
