import {useContext} from 'react';
import ScrollableBlockContext from './ScrollableBlockContext';

/**
 * Provides facade for ScrollableBlockContext values
 */
const useScrollableBlock = () => {
    return useContext(ScrollableBlockContext);
};

export default useScrollableBlock;
