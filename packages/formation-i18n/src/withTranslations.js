import React from 'react';
import PropTypes from 'prop-types';
import I18nContext from './I18nContext';

export const withTranslations = BaseComponent => {
    const ComposedComponent = props => (
        <I18nContext.Consumer>
            {context => {
                const {activeLocale, availableLocales, setActiveLocale, translate} = context;

                return (
                    <BaseComponent
                        {...props}
                        activeLocale={activeLocale}
                        availableLocales={availableLocales}
                        setActiveLocale={setActiveLocale}
                        translate={translate}
                    />
                );
            }}
        </I18nContext.Consumer>
    );

    ComposedComponent.displayName = `withTranslations(${BaseComponent.displayName || BaseComponent.name})`;

    ComposedComponent.propTypes = {
        ...BaseComponent.propTypes,
    };

    ComposedComponent.defaultProps = {
        ...BaseComponent.defaultProps,
    };

    return ComposedComponent;
};

export const withTranslationsPropTypes = {
    activeLocale: PropTypes.string,
    availableLocales: PropTypes.array,
    setActiveLocale: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export const withTranslationsDefaultProps = {
    activeLocale: '',
    availableLocales: [],
    setActiveLocale: () => {},
    translate: () => {},
};
