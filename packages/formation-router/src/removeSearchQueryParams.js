
/**
 * Removes specific query params from search query string
 *
 * @param searchQueryString
 * @param paramsForRemoval
 * @returns string
 */
const removeSearchQueryParams = (searchQueryString, paramsForRemoval = []) => {
    if (!searchQueryString || paramsForRemoval.length === 0) return '';

    const newSearchQueryString = new URLSearchParams(searchQueryString);
    paramsForRemoval.forEach(paramForRemoval => {
        newSearchQueryString.delete(paramForRemoval);
    });

    return newSearchQueryString.toString();
};

export default removeSearchQueryParams;
