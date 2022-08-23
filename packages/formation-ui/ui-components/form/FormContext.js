import React from 'react';

export default React.createContext({
    formGroupName: null,
    formFieldRegistry: new Map(),
    formFieldStates: new Map(),
    registerFormField: () => null,
    unregisterFormField: () => null,
    setFormFieldState: () => null,
    isSubmitOnEnterEnabled: undefined,
    submitForm: () => null,
    formGroupValue: null,
    isFormGroupDisabled: undefined,
});
