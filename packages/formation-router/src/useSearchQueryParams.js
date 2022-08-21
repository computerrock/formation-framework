import {useMemo} from 'react';
import {useLocation} from 'react-router';
import parseSearchQueryParams from './parseSearchQueryParams';

/**
 * Returns search query params key:value pairs
 */
const useSearchQueryParams = () => {
    const location = useLocation();

    return useMemo(() => {
        return parseSearchQueryParams(location.search);
    }, [location.search]);
};

export default useSearchQueryParams;
