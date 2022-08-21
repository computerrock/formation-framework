/**
 * Parses search query params into key:value pairs
 */
const parseSearchQueryParams = (searchQuery = '') => {
    const urlSearchParams = new URLSearchParams(searchQuery);
    const searchQueryParams = {};

    urlSearchParams.forEach((value, key) => {
        if (typeof searchQueryParams[key] !== 'undefined') {
            searchQueryParams[key] = [
                ...(Array.isArray(searchQueryParams[key])
                    ? searchQueryParams[key] : [searchQueryParams[key]]),
                value,
            ];
        }

        searchQueryParams[key] = value;
    });

    return searchQueryParams;
};

export default parseSearchQueryParams;
