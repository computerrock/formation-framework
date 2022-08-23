import React, {useState, useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import DropDownContext from './DropDownContext';

/**
 * Provides context for DropDown usage instance
 */
const DropDownProvider = ({children, baseComponentRef}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownTriggerRef = useRef();
    const dropDownRef = useRef();
    const childDropDownRefs = useRef([]);
    const {generationIndex: parentGenerationIndex, registerChildDropDown} = useContext(DropDownContext);

    const toggleDropDown = newState => {
        setIsOpen(prevState => (typeof newState !== 'undefined' ? newState : !prevState));
    };

    const openDropDown = () => {
        setIsOpen(true);
    };

    const closeDropDown = () => {
        if (!dropDownRef.current) return;
        setIsOpen(false);
    };

    const ownRegisterChildDropDown = newChildDropDownRef => {
        const childDropDownRegistered = childDropDownRefs.current
            .reduce((childDropDownRegistered, childDropDownRef) => {
                return childDropDownRegistered
                    || childDropDownRef.current === newChildDropDownRef.current;
            }, false);

        if (!childDropDownRegistered) {
            childDropDownRefs.current = [
                ...childDropDownRefs.current,
                newChildDropDownRef,
            ];
        }
    };

    if (parentGenerationIndex > 0) {
        registerChildDropDown(dropDownRef);
    }

    return (
        <DropDownContext.Provider
            value={{
                dropDownRef,
                dropDownTriggerRef: baseComponentRef || dropDownTriggerRef,
                isOpen,
                childDropDownRefs,
                generationIndex: parentGenerationIndex + 1,
                toggleDropDown,
                openDropDown,
                closeDropDown,
                registerChildDropDown: ownRegisterChildDropDown,
            }}
        >
            {children}
        </DropDownContext.Provider>
    );
};

DropDownProvider.propTypes = {
    baseComponentRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.elementType}),
    ]),
};

DropDownProvider.defaultProps = {
    baseComponentRef: null,
};

export default DropDownProvider;
