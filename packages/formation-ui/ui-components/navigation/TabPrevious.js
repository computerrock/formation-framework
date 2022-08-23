import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TabSetContext from './TabSetContext';
import useStyles from '../useStyles';
import styles from './Tab.module.scss';
import Icon from '../icons/Icon';
import arrowLeftIcon from '../assets/icons/arrow-left.svg';

const TabPrevious = props => {
    const {cx} = useStyles(props, styles, {setClassNameToBEMElement: true});
    const {onClick} = props;
    const {goToPreviousTab, isTabSetDisabled, isPreviousControlDisabled, qaIdentPart} = useContext(TabSetContext);

    const handleOnClick = () => {
        goToPreviousTab();
        if (typeof onClick === 'function') onClick();
    };

    return (
        <div
            className={cx('ace-c-tab__navigation-arrow', {
                'ace-c-tab__navigation-arrow--is-disabled': isTabSetDisabled || isPreviousControlDisabled,
            })}
            onClick={handleOnClick}
            data-qa={qaIdentPart('navigation-previous')}
        >
            <Icon icon={arrowLeftIcon} />
        </div>
    );
};

TabPrevious.propTypes = {
    onClick: PropTypes.func,
};

TabPrevious.defaultProps = {
    onClick: null,
};

export default TabPrevious;
