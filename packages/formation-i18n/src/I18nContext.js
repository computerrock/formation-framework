import React from 'react';

export default React.createContext({
    activeLocale: '',
    availableLocales: [],
    setActiveLocale: () => {},
    translate: key => key,
    createTranslateShorthand: () => key => key,
});
