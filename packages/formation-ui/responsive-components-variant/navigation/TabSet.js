import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import TabSetContext from './TabSetContext';

const TabSet = props => {
    const {name, children} = props;
    const tabBarRef = useRef();
    const [activeTab, setActiveTab] = useState();
    const [isTabSetDisabled, setIsTabSetDisabled] = useState();
    const [isPreviousControlDisabled, setIsPreviousControlDisabled] = useState();
    const [isNextControlDisabled, setIsNextControlDisabled] = useState();

    const goToPreviousTab = () => {
        if (isTabSetDisabled || isPreviousControlDisabled) return;

        if (typeof tabBarRef.current.goToPreviousTab === 'function') {
            tabBarRef.current.goToPreviousTab();
        }
    };

    const goToNextTab = () => {
        if (isTabSetDisabled || isNextControlDisabled) return;

        if (typeof tabBarRef.current.goToNextTab === 'function') {
            tabBarRef.current.goToNextTab();
        }
    };

    const toggleTabSetControlDisabledState = (controlName, isDisabled) => {
        if (controlName === 'previous') setIsPreviousControlDisabled(isDisabled);
        if (controlName === 'next') setIsNextControlDisabled(isDisabled);
    };

    return (
        <TabSetContext.Provider
            value={{
                tabSetName: name || undefined,
                tabBarRef,
                activeTab,
                setActiveTab,
                goToPreviousTab,
                goToNextTab,
                isPreviousControlDisabled,
                isNextControlDisabled,
                isTabSetDisabled,
                toggleTabSetDisabledState: setIsTabSetDisabled,
                toggleTabSetControlDisabledState,
            }}
        >
            {children}
        </TabSetContext.Provider>
    );
};

TabSet.propTypes = {
    name: PropTypes.string,
};

TabSet.defaultProps = {
    name: null,
};

export default TabSet;
