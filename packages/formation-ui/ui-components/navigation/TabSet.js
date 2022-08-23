import React, {useState, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useHistory, useLocation, useSearchQueryParams, prepareSearchQueryParams} from '@computerrock/formation-router';
import useQAIdent from '../useQAIdent';
import TabSetContext from './TabSetContext';

const TabSet = props => {
    const {name, isRoutingEnabled, routeQueryParam, children} = props;
    const tabBarRef = useRef();
    const [localActiveTab, setLocalActiveTab] = useState();
    const [isTabSetDisabled, setIsTabSetDisabled] = useState();
    const [isPreviousControlDisabled, setIsPreviousControlDisabled] = useState();
    const [isNextControlDisabled, setIsNextControlDisabled] = useState();
    const history = useHistory();
    const location = useLocation();
    const queryParams = useSearchQueryParams();
    const {qaIdentPart} = useQAIdent(props, {qaIdentRoot: 'tab-set', qaIdent: props.qaIdent || name});

    const setActiveTab = useCallback((newActiveTab, additionalSearchQueryParams) => {
        if (!isRoutingEnabled) {
            setLocalActiveTab(newActiveTab);
            return;
        }

        if (newActiveTab !== queryParams[routeQueryParam]) {
            history.replace({
                pathname: location.pathname,
                search: prepareSearchQueryParams({
                    [routeQueryParam]: newActiveTab,
                    ...(additionalSearchQueryParams ? {...additionalSearchQueryParams} : {}),
                }),
            });
        }
    }, [isRoutingEnabled, routeQueryParam, queryParams, location.pathname, history]);

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

    const goToTab = tabName => {
        if (isTabSetDisabled) return;

        if (typeof tabBarRef.current.goToTab === 'function') {
            tabBarRef.current.goToTab(tabName);
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
                activeTab: !isRoutingEnabled ? localActiveTab : queryParams[routeQueryParam],
                setActiveTab,
                goToPreviousTab,
                goToNextTab,
                goToTab,
                isPreviousControlDisabled,
                isNextControlDisabled,
                isTabSetDisabled,
                toggleTabSetDisabledState: setIsTabSetDisabled,
                toggleTabSetControlDisabledState,
                qaIdentPart,
            }}
        >
            {children}
        </TabSetContext.Provider>
    );
};

TabSet.propTypes = {
    name: PropTypes.string,
    isRoutingEnabled: PropTypes.bool,
    routeQueryParam: PropTypes.string,
    qaIdent: PropTypes.string,
};

TabSet.defaultProps = {
    name: null,
    isRoutingEnabled: false,
    routeQueryParam: 'activeTab',
    qaIdent: '',
};

export default TabSet;
