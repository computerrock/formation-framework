import React from 'react';

export default React.createContext({
    selectableGroupName: null,
    selectableFieldRegistry: new Map(),
    selectableFieldStates: new Map(),
    registerSelectableField: () => null,
    unregisterSelectableField: () => null,
    setSelectableFieldState: () => null,
    selectableGroupValue: null,
    isSelectableGroupDisabled: undefined,
    isSelectableGroupMultipleChoice: undefined,
});
