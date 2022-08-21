import React from 'react';

export default React.createContext({
    goBack: () => undefined,
    openModal: () => undefined,
    closeModal: () => undefined,
    registerRouteUnmountEffect: () => undefined,
    unregisterRouteUnmountEffect: () => undefined,
});
