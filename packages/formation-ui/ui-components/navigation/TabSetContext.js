import React from 'react';

export default React.createContext({
    tabSetName: null,
    tabBarRef: null,
    activeTab: null,
    setActiveTab: () => null,
    goToPreviousTab: () => null,
    goToNextTab: () => null,
    goToTab: () => null,
    isPreviousControlDisabled: false,
    isNextControlDisabled: false,
    isTabSetDisabled: false,
    toggleTabSetDisabledState: () => null,
    toggleTabSetControlDisabledState: () => null,
    qaIdentPart: () => null,
});
