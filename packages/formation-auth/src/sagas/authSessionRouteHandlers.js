import store from 'store';

export const setNewAuthSessionRoute = function setNewAuthSessionRoute(newAuthSessionRoute = null) {
    const {instanceName} = this;
    const storageKey = `${instanceName.toLowerCase()}_auth_new_session_route`;
    store.set(storageKey, JSON.stringify(newAuthSessionRoute));
};

export const getOnceNewAuthSessionRoute = function getOnceNewAuthSessionRoute() {
    const {instanceName} = this;
    const storageKey = `${instanceName.toLowerCase()}_auth_new_session_route`;
    const storedNewAuthSessionRoute = store.get(storageKey);
    if (!storedNewAuthSessionRoute) return null;

    try {
        store.remove(storageKey);
        return JSON.parse(storedNewAuthSessionRoute);
    } catch (e) {
        return null;
    }
};
