import React from 'react';

export default React.createContext({
    dropDownRef: null,
    dropDownTriggerRef: null,
    isOpen: false,
    generationIndex: 0,
    childDropDownRefs: {current: []},
    toggleDropDown: () => null,
    openDropDown: () => null,
    closeDropDown: () => null,
    registerChildDropDown: () => null,
});
