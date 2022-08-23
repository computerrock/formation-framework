import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TabSetContext from './TabSetContext';
import useStyles from '../useStyles';
import styles from './Tab.module.scss';
import Icon from '../icons/Icon';
import arrowRightIcon from '../assets/icons/arrow-right.svg';

const TabNext = props => {
    const {cx} = useStyles(props, styles, {setClassNameToBEMElement: true});
    const {onClick} = props;
    const {goToNextTab, isTabSetDisabled, isNextControlDisabled} = useContext(TabSetContext);

    const handleOnClick = () => {
        goToNextTab();
        if (typeof onClick === 'function') onClick();
    };

    return (
        <div
            className={cx('ace-c-tab__navigation-arrow', {
                'ace-c-tab__navigation-arrow--is-disabled': isTabSetDisabled || isNextControlDisabled,
            })}
            onClick={handleOnClick}
        >
            <Icon icon={arrowRightIcon} />
        </div>
    );
};

TabNext.propTypes = {
    onClick: PropTypes.func,
};

TabNext.defaultProps = {
    onClick: null,
};

export default TabNext;
