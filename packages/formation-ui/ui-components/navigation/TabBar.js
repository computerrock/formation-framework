import React, {useContext, useEffect, useImperativeHandle, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import TabSetContext from './TabSetContext';
import styles from './TabBar.module.scss';
import useStyles from '../useStyles';

const TabBar = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, tabSet, selectableFieldStates, setSelectableFieldState, isDisabled, qaIdent} = props;
    const {tabSetName, tabBarRef, activeTab, setActiveTab} = useContext(TabSetContext);
    const {toggleTabSetDisabledState, toggleTabSetControlDisabledState} = useContext(TabSetContext);
    const {qaIdentPart} = useContext(TabSetContext);
    const prevIsDisabledRef = useRef();

    const getAdditionalSearchQueryParameters = useCallback(tabName => {
        const [activeChild] = children.filter(child => child?.name === tabName);
        if (activeChild) {
            return activeChild.props?.additionalSearchQueryParams || null;
        }

        return null;
    }, [children]);

    // selects active tab by updating selectableFieldStates of TabBar (SelectableGroup)
    const selectActiveTab = useCallback(tabId => {
        const selectableFieldState = selectableFieldStates.get(tabId);
        const additionalSearchQueryParams = getAdditionalSearchQueryParameters(tabId);
        setActiveTab(tabId, additionalSearchQueryParams);
        if (selectableFieldState) {
            setSelectableFieldState(tabId, {
                ...selectableFieldState,
                isTouched: true,
                isSelected: true,
            });
        }
    }, [setActiveTab, selectableFieldStates, setSelectableFieldState, getAdditionalSearchQueryParameters]);

    // attach previous/next tab change handlers to tabBarRef, so TabSet can delegate
    // calls to them from TabPrevious/TabNext controls. Use `ref` from props as fallback.
    useImperativeHandle(tabBarRef || ref, () => ({
        goToPreviousTab: () => {
            if (tabSet !== tabSetName) return;

            const tabIds = [...selectableFieldStates.keys()];
            const index = tabIds.findIndex(tabId => tabId === activeTab);
            if (index > 0 && !!tabIds[index - 1]) {
                selectActiveTab(tabIds[index - 1]);
                toggleTabSetControlDisabledState('previous', !tabIds[index - 2]);
            }
        },
        goToNextTab: () => {
            if (tabSet !== tabSetName) return;

            const tabIds = [...selectableFieldStates.keys()];
            const index = tabIds.findIndex(tabId => tabId === activeTab);
            if (index >= 0 && !!tabIds[index + 1]) {
                selectActiveTab(tabIds[index + 1]);
                toggleTabSetControlDisabledState('next', !tabIds[index + 2]);
            }
        },
        goToTab: tabName => {
            if (tabSet !== tabSetName) return;

            const tabIds = [...selectableFieldStates.keys()];
            const index = tabIds.findIndex(tabId => tabId === tabName);
            if (index >= 0) {
                selectActiveTab(tabIds[index]);
                toggleTabSetControlDisabledState('previous', !tabIds[index - 1]);
                toggleTabSetControlDisabledState('next', !tabIds[index + 1]);
            }
        },
    }), [selectableFieldStates, activeTab, toggleTabSetControlDisabledState, tabSet, tabSetName, selectActiveTab]);

    // on TabBar item selection (SelectableGroup selectableFieldStates change) set activeTab value of a TabSet
    useEffect(() => {
        if (tabSet !== tabSetName) return;

        let activeTab;
        let additionalSearchQueryParams = null;
        selectableFieldStates.forEach((fieldState, fieldName) => {
            if (fieldState.isSelected) {
                activeTab = fieldName;
                additionalSearchQueryParams = getAdditionalSearchQueryParameters(fieldName);
            }
        });

        if (typeof activeTab !== 'undefined') {
            setActiveTab(activeTab, additionalSearchQueryParams);
        }
    }, [selectableFieldStates, setActiveTab, tabSet, tabSetName, getAdditionalSearchQueryParameters]);

    // on first/last TabBar item selection toggle disabled state for controls
    useEffect(() => {
        if (tabSet !== tabSetName) return;

        const tabIds = [...selectableFieldStates.keys()];
        const index = tabIds.findIndex(tabId => tabId === activeTab);
        if (index >= 0) {
            toggleTabSetControlDisabledState('previous', !tabIds[index - 1]);
            toggleTabSetControlDisabledState('next', !tabIds[index + 1]);
        }
    }, [selectableFieldStates, activeTab, toggleTabSetControlDisabledState, tabSet, tabSetName]);

    // on TabBar isDisabled state change, toggle TabSet state
    useEffect(() => {
        if (tabSet !== tabSetName) return;

        if (prevIsDisabledRef.current !== isDisabled) {
            toggleTabSetDisabledState(isDisabled);
            prevIsDisabledRef.current = isDisabled;
        }
    }, [isDisabled, toggleTabSetDisabledState, tabSet, tabSetName]);

    return (
        <div
            ref={ref}
            className={cx('ace-c-tab-bar')}
            data-qa={qaIdentPart('tab-bar') || qaIdent}
        >
            {children}
        </div>
    );
});

TabBar.displayName = 'TabBar';

TabBar.propTypes = {
    ...withFormContextPropTypes,
    tabSet: PropTypes.string,
};

TabBar.defaultProps = {
    ...withFormContextDefaultProps,
    tabSet: '',
};

export default withFormContext({componentName: 'TabBar', isSelectableGroup: true})(TabBar);
