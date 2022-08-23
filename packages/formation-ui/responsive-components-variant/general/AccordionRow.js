import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './AccordionRow.module.scss';
import useStyles from '../useStyles';
import {arrowDownIcon, arrowUpIcon, Icon} from '../icons';
import Divider from './Divider';

const AccordionRow = props => {
    const {isDefaultOpenState, children, title} = props;
    const {cx} = useStyles(props, styles);
    const [isOpened, setIsOpened] = useState(isDefaultOpenState);

    return (
        <div className={cx('ace-c-accordion-row')}>
            <div className={cx('ace-c-accordion-row__header')} onClick={() => setIsOpened(isOpened => !isOpened)}>
                <p className={cx('ace-c-accordion-row__header__title')}>{title}</p>
                <Icon className={cx('ace-c-accordion-row__header__icon')} icon={isOpened ? arrowUpIcon : arrowDownIcon} />
            </div>
            {isOpened && (
                <Fragment>
                    <Divider />
                    <div className={cx('ace-c-accordion-row__content')}>
                        {children}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

AccordionRow.propTypes = {
    isDefaultOpenState: PropTypes.bool,
    title: PropTypes.string.isRequired,
};

AccordionRow.defaultProps = {
    isDefaultOpenState: true,
};

export default AccordionRow;
