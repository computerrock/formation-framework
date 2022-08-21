import handleResponse from './handleResponse';

/**
 * I18nService
 *
 * @constructor
 */
const I18nService = function (serviceParameters = {}) {
    const {
        LOCALE = 'en-US',
        DEFAULT_LOCALE_TRANSLATIONS = {},
        LOCALE_RESOURCES = [],
    } = serviceParameters;
    const defaultLocaleTranslations = DEFAULT_LOCALE_TRANSLATIONS;
    const localeResources = typeof LOCALE_RESOURCES !== 'undefined' && Array.isArray(LOCALE_RESOURCES)
        ? LOCALE_RESOURCES : [];
    const onServiceUpdateCallbacks = [];
    let activeLocale = LOCALE;
    let activeLocaleSet = {};
    let availableLocaleSets = {};
    let availableLocales = [];

    // parse translation sets (keys & translations)
    const allLocaleSetsPromise = Promise.all([
        // load each remote resource translation set
        ...localeResources.map(localeResource => {
            if (!localeResource['locale'] || !localeResource['url']) return Promise.resolve(false);

            return fetch(localeResource['url'], {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(handleResponse)
                .catch(() => false);
        }),
    ])
        .then(resourceLocaleTranslations => {
            // filter failed resource loads
            resourceLocaleTranslations = resourceLocaleTranslations.filter(Boolean);

            // map default locale sets
            return Object.keys(defaultLocaleTranslations).reduce((allLocaleSets, localeKey) => {
                const localeSet = defaultLocaleTranslations[localeKey];
                if (typeof localeSet['locale'] !== 'undefined') {
                    // check if resource locale set provided
                    const resourceLocaleSet = resourceLocaleTranslations.find(resourceLocaleSet => {
                        return resourceLocaleSet['locale'] === localeSet['locale'];
                    });

                    if (resourceLocaleSet) {
                        // map resource locale translationKeys to default locale set key
                        // only keys that exist in default set are over-written
                        Object.keys(resourceLocaleSet).forEach(translationKey => {
                            if (typeof localeSet[translationKey] !== 'undefined'
                                && typeof resourceLocaleSet[translationKey] === 'string') {
                                localeSet[translationKey] = resourceLocaleSet[translationKey];
                            }
                        });
                    }

                    allLocaleSets[localeSet['locale']] = localeSet;
                }

                return allLocaleSets;
            }, {
                // initial locale translations
                'en-US': {
                    'locale': 'en-US',
                    'locale.label': 'English',
                },
            });
        })
        .then(allLocaleSets => {
            activeLocaleSet = allLocaleSets[activeLocale];
            availableLocaleSets = allLocaleSets;
            availableLocales = Object.keys(allLocaleSets).map(key => ({
                locale: key,
                label: allLocaleSets[key]['label'],
                language: allLocaleSets[key]['language'],
            }));

            onServiceUpdateCallbacks.forEach(callback => {
                if (typeof callback === 'function') {
                    callback(activeLocale, availableLocales);
                }
            });

            return allLocaleSets;
        });

    const setActiveLocale = async locale => {
        const allLocaleSets = await allLocaleSetsPromise;

        if (typeof allLocaleSets[locale] !== 'undefined') {
            activeLocale = locale;
            activeLocaleSet = allLocaleSets[locale];

            onServiceUpdateCallbacks.forEach(callback => {
                if (typeof callback === 'function') {
                    callback(activeLocale, availableLocales);
                }
            });
        }
    };

    const translate = (key = 'key', params = {}, locale) => {
        const localeSet = typeof locale !== 'string' ? activeLocaleSet
            : (typeof availableLocaleSets[locale] !== 'undefined' ? availableLocaleSets[locale] : {});

        if (typeof localeSet[key] === 'undefined') return key;

        let translation = localeSet[key];
        Object.keys(params).forEach(key => {
            translation = translation.replace(new RegExp(`{${key}}`, 'g'), params[key]);
        });

        return translation;
    };

    const createTranslateShorthand = (keyRoot = 'key_root') => (shorthandKey = 'shorthand_key', params, locale) => {
        return translate(`${keyRoot}.${shorthandKey}`, params, locale);
    };

    return {
        activeLocale,
        setActiveLocale,
        getActiveLocale: () => activeLocale,
        getAvailableLocales: async () => {
            await allLocaleSetsPromise;
            return availableLocales;
        },
        availableLocales,
        translate,
        createTranslateShorthand,
        onServiceUpdate: callback => {
            const callbacksLength = onServiceUpdateCallbacks.push(callback);

            return () => {
                onServiceUpdateCallbacks.splice(callbacksLength - 1, 1);
            };
        },
    };
};

export default I18nService;
