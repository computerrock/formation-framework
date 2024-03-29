import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Overlay, positions} from '@computerrock/formation-ui/overlays';
import useStyles from '../useStyles';
import useFocusSwitch from '../utils/useFocusSwitch';
import styles from './PopOver.module.scss';
import DropDownContext from './DropDownContext';
import getDropDownPosition from './getDropDownPosition';

const PopOver = props => {
    const {children, direction, alignment} = props;
    const {cx} = useStyles(props, styles);
    const [dropDownPosition, setDropDownPosition] = useState(positions.DEFAULT_POSITION);
    const {dropDownTriggerRef, dropDownRef, isOpen, closeDropDown} = useContext(DropDownContext);
    const {generationIndex} = useContext(DropDownContext);

    useFocusSwitch({
        ref: [dropDownTriggerRef, dropDownRef],
        onClickOutside: () => {
            closeDropDown();
        },
    });

    useEffect(() => {
        // defer drop-down positioning until render of child components is finished
        const timer = setTimeout(() => {
            if (!dropDownRef.current || !dropDownTriggerRef.current) return;

            setDropDownPosition(getDropDownPosition({
                dropDownTriggerElem: dropDownTriggerRef.current,
                dropDownElem: dropDownRef.current,
                direction,
                alignment,
            }));
        }, 0);
        return () => clearTimeout(timer);
    }, [isOpen, dropDownRef, dropDownTriggerRef, direction, alignment]);

    return isOpen ? (
        <Overlay id={`drop-down-${generationIndex}`} type="drop-down" position={dropDownPosition}>
            <div className={cx('ace-c-pop-over')} ref={dropDownRef}>
                <div className={cx('ace-c-pop-over__content')}>
                    {children}
                </div>
            </div>
        </Overlay>
    ) : null;
};

PopOver.propTypes = {
    direction: PropTypes.oneOf([positions.DIRECTION_TOP, positions.DIRECTION_BOTTOM]),
    alignment: PropTypes.oneOf([positions.ALIGNMENT_START, positions.ALIGNMENT_END]),
};

PopOver.defaultProps = {
    direction: positions.DIRECTION_BOTTOM,
    alignment: positions.ALIGNMENT_START,
};

export default PopOver;
