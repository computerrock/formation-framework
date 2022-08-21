/**
 * Maps given parameters to search query parameters
 *
 * @param {Object} searchQueryParams
 * @param {string} prevSearchQuery
 * @param {boolean} replaceArrayParams
 * @returns string
 */
const prepareSearchQueryParams = (searchQueryParams = {}, prevSearchQuery = '?', replaceArrayParams = false) => {
    const params = new URLSearchParams(prevSearchQuery);
    Object.entries(searchQueryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (replaceArrayParams) params.delete(`${key}`);
            value.forEach(param => params.append(`${key}`, param));
        }

        if (typeof value === 'string') {
            params.set(`${key}`, value);
        }
    });
    return `?${params.toString()}`;
};

export default prepareSearchQueryParams;
