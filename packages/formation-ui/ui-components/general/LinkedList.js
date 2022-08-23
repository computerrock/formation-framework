import React, {useState, useLayoutEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './LinkedList.module.scss';

const LinkedList = props => {
    // TODO followElement prop is forwarded here, to make simulation of listener, relative to it,
    //  is exist some changes in `memberNotes`
    // TODO that's resolve for now, we could make change here
    const {children, followElement} = props;
    const {cx} = useStyles(props, styles);
    const linkedListRef = useRef();
    const [isLinkedListScrollable, setIsLinkedListScrollable] = useState(false);

    useLayoutEffect(() => {
        if (!linkedListRef && !linkedListRef.current) return;
        const currentLinkedListHeight = linkedListRef.current.clientHeight;

        if (currentLinkedListHeight >= 435) {
            setIsLinkedListScrollable(true);
        } else {
            setIsLinkedListScrollable(false);
        }

        return () => {
            return currentLinkedListHeight;
        };
    }, [followElement]);


    return (
        <ul
            ref={linkedListRef}
            className={cx([
                'ace-c-linked-list',
                {'ace-c-linked-list--shadowed': isLinkedListScrollable},
                {'global!ace-u-padding--8-0': isLinkedListScrollable},
            ])}
        >
            {children}
        </ul>
    );
};

LinkedList.propTypes = {
    followElement: PropTypes.array,
};

LinkedList.defaultProps = {
    followElement: [],
};


export default LinkedList;
