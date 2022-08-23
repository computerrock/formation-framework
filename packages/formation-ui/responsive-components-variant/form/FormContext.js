import React from 'react';

export default React.createContext({
    formGroupName: null,
    formFieldRegistry: new Map(),
    formFieldStates: new Map(),
    registerFormField: () => null,
    unregisterFormField: () => null,
    setFormFieldState: () => null,
    submitForm: () => null,
    formGroupValue: null,
    isFormGroupDisabled: undefined,
});
