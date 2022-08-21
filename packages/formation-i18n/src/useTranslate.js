import {useContext} from 'react';
import I18nContext from './I18nContext';

/**
 * Provides facade for I18nContext values
 */
const useTranslate = () => {
    return useContext(I18nContext);
};

export default useTranslate;
