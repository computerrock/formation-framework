import {useContext} from 'react';
import RouterContext from './RouterContext';

/**
 * Simplifies usage of RouterContext
 */
const useRouter = () => {
    const {goBack, openModal, closeModal} = useContext(RouterContext);

    return {goBack, openModal, closeModal};
};

export default useRouter;
