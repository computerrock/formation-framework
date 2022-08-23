import {paramCase} from 'change-case';

/**
 * Enables usage of data-qa locator attribute
 *
 * @param {Object} props
 * @param {Object} options
 * @param {string} options.qaIdentPrefix
 * @param {string} options.qaIdentRoot
 * @param {string} options.qaIdent
 * @param {string} options.qaIdentPostfix
 */
const useQAIdent = (props = {}, options = {}) => {
    const qaIdent = paramCase([
        options.qaIdentRoot || props.qaIdentRoot || '',
        options.qaIdent || props.qaIdent || '',
    ].filter(value => !!value).join('-') || '');

    return {
        qaIdent,
        qaIdentPart: (partName, partProps = {}) => paramCase([
            partProps.qaIdentPartPrefix || '',
            options.qaIdentRoot || props.qaIdentRoot || '',
            options.qaIdent || props.qaIdent || '',
            partName || '',
            partProps.qaIdentPart || '',
            partProps.qaIdentPartPostfix || '',
        ].filter(value => !!value).join('-') || ''),
    };
};

export default useQAIdent;
