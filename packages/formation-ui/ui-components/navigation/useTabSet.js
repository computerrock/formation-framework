import {useContext} from 'react';
import TabSetContext from './TabSetContext';

const useTabSet = () => {
    const {goToTab, goToNextTab, goToPreviousTab} = useContext(TabSetContext);

    return {goToTab, goToNextTab, goToPreviousTab};
};

export default useTabSet;
