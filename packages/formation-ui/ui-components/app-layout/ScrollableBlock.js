import React, {useState, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import useStyles from '../useStyles';
import styles from './ScrollableBlock.module.scss';
import InteractiveIcon from '../icons/InteractiveIcon';
import sortAscIcon from '../assets/icons/sort-asc.svg';
import ScrollableBlockContext from './ScrollableBlockContext';

const ScrollableBlock = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, contentClassName, label, isLabelDisabled} = props;
    const localScrollablePanelRef = useRef();
    const scrollablePanelRef = ref || localScrollablePanelRef;
    const [isContentScrolled, setIsContentScrolled] = useState(false);

    const onScroll = useMemo(() => debounce(event => {
        if (event.target) setIsContentScrolled(event.target.scrollTop > 0);
    }, 45, {leading: true}), []);

    const scrollToTheBottom = () => {
        if (scrollablePanelRef.current) {
            scrollablePanelRef.current.scrollTop = scrollablePanelRef.current.scrollHeight;
        }
    };

    const scrollToChildRef = childRef => {
        if (scrollablePanelRef.current && childRef.current) {
            scrollablePanelRef.current.scrollTop = childRef.current.offsetTop;
        }
    };

    return (
        <div
            className={cx('ace-c-scrollable-block', {
                'ace-c-scrollable-block--is-content-scrolled': isContentScrolled,
            })}
        >
            <div
                className={cx('ace-c-scrollable-block__content-panel')}
                ref={scrollablePanelRef}
                onScroll={onScroll}
            >
                <div className={cx('ace-c-scrollable-block__content', contentClassName)}>
                    <ScrollableBlockContext.Provider value={{isContentScrolled, scrollToChildRef}}>
                        {children}
                    </ScrollableBlockContext.Provider>
                </div>
            </div>
            {!isLabelDisabled && !isContentScrolled && (
                <div className={cx('ace-c-scrollable-block__info-panel')}>
                    <InteractiveIcon
                        icon={sortAscIcon}
                        onClick={scrollToTheBottom}
                        className={cx([
                            'ace-c-interactive-icon--reverse',
                            'ace-c-interactive-icon--primary',
                        ])}
                    >
                        {label || 'Scroll to see more...'}
                    </InteractiveIcon>
                </div>
            )}
        </div>
    );
});

ScrollableBlock.propTypes = {
    // contentClassName may be used for assigning utility classes that apply
    // to content container of the panel. Eg. ace-u-flex, ace-u-grid, ...
    contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    label: PropTypes.node,
    isLabelDisabled: PropTypes.bool,
};

ScrollableBlock.defaultProps = {
    contentClassName: '',
    label: null,
    isLabelDisabled: false,
};

export default ScrollableBlock;
