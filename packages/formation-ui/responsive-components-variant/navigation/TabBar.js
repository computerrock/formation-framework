import React, {useContext, useEffect, useImperativeHandle, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import TabSetContext from './TabSetContext';
import styles from './TabBar.module.scss';
import useStyles from '../useStyles';

const TabBar = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {children, tabSet, selectableFieldStates, setSelectableFieldState, isDisabled} = props;
    const {tabSetName, tabBarRef, activeTab, setActiveTab} = useContext(TabSetContext);
    const {toggleTabSetDisabledState, toggleTabSetControlDisabledState} = useContext(TabSetContext);
    const prevIsDisabledRef = useRef();

    // selects active tab by updating selectableFieldStates of TabBar (SelectableGroup)
    const selectActiveTab = useCallback(tabId => {
        setActiveTab(tabId);
        const selectableFieldState = selectableFieldStates.get(tabId);
        if (selectableFieldState) {
            setSelectableFieldState(tabId, {
                ...selectableFieldState,
                isTouched: true,
                isSelected: true,
            });
        }
    }, [setActiveTab, selectableFieldStates, setSelectableFieldState]);

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
    }), [selectableFieldStates, activeTab, toggleTabSetControlDisabledState, tabSet, tabSetName, selectActiveTab]);

    // on TabBar item selection (SelectableGroup selectableFieldStates change) set activeTab value od TabSet
    useEffect(() => {
        if (tabSet !== tabSetName) return;

        let activeTab;
        selectableFieldStates.forEach((fieldState, fieldName) => {
            if (fieldState.isSelected) activeTab = fieldName;
        });
        setActiveTab(activeTab);

        // toggle disabled state for controls
        const tabIds = [...selectableFieldStates.keys()];
        const index = tabIds.findIndex(tabId => tabId === activeTab);
        if (index >= 0) {
            toggleTabSetControlDisabledState('previous', !tabIds[index - 1]);
            toggleTabSetControlDisabledState('next', !tabIds[index + 1]);
        }
    }, [selectableFieldStates, setActiveTab, toggleTabSetControlDisabledState, tabSet, tabSetName]);

    // on TabBar isDisabled state change, toggle TabSet state
    useEffect(() => {
        if (tabSet !== tabSetName) return;

        if (prevIsDisabledRef.current !== isDisabled) {
            toggleTabSetDisabledState(isDisabled);
            prevIsDisabledRef.current = isDisabled;
        }
    }, [isDisabled, toggleTabSetDisabledState, tabSet, tabSetName]);

    return (
        <div ref={ref} className={cx('ace-c-tab-bar')}>
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

export default withFormContext({isSelectableGroup: true})(TabBar);
