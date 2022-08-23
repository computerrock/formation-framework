import React from 'react';
import PropTypes from 'prop-types';
import {useTranslate} from '@computerrock/formation-i18n';
import {InteractiveIcon, arrowLeftIcon, arrowRightIcon} from '../icons';
import useStyles from '../useStyles';
import styles from './Paginator.module.scss';

const Paginator = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {translate} = useTranslate();
    const {onClick, page, count} = props;

    return (
        <div className={cx('ace-c-paginator')}>
            <InteractiveIcon
                className={cx('ace-c-interactive-icon--primary')}
                icon={arrowLeftIcon}
                onClick={() => (page > 0 && onClick(page - 1))}
                isDisabled={page === 0}
            />
            <p
                className={cx('global!ace-u-margin--24-48', 'global!ace-u-typography--variant-body')}
            >
                {`${translate('global.pagination_text.page')} ${page + 1} ${translate('global.pagination_text.of')} ${count}`}
            </p>
            <InteractiveIcon
                className={cx('ace-c-interactive-icon--primary')}
                icon={arrowRightIcon}
                onClick={() => (page + 1 !== count && onClick(page + 1))}
                isDisabled={page + 1 === count}
            />
        </div>
    );
});

Paginator.displayName = 'Paginator';

Paginator.propTypes = {
    page: PropTypes.number,
    count: PropTypes.number,
    onClick: PropTypes.func,
};

Paginator.defaultProps = {
    page: 0,
    count: 10,
    onClick: () => {},
};

export default Paginator;
