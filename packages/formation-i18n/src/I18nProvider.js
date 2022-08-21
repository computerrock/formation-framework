import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import I18nContext from './I18nContext';

const I18nProvider = ({children, service}) => {
    const [activeLocale, setActiveLocale] = useState(service.getActiveLocale());
    const [availableLocales, setAvailableLocales] = useState([]);

    // subscribe provider state to i18n service changes
    useEffect(() => {
        return service.onServiceUpdate((activeLocale, availableLocales) => {
            setActiveLocale(activeLocale);
            setAvailableLocales(availableLocales);
        });
    }, [service]);

    // don't return provider if no I18nService given
    if (!service || typeof service.translate !== 'function') {
        return children;
    }

    // wait for locale to be ready before rendering anything
    if (!activeLocale) return null;

    return (
        <I18nContext.Provider
            value={{
                availableLocales,
                activeLocale,
                setActiveLocale: service.setActiveLocale,
                translate: service.translate,
                createTranslateShorthand: service.createTranslateShorthand,
            }}
        >
            {children}
        </I18nContext.Provider>
    );
};

I18nProvider.propTypes = {
    service: PropTypes.object,
};

I18nProvider.defaultProps = {
    service: null,
};

export default I18nProvider;
