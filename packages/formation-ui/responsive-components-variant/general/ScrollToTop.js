import React, {useEffect} from 'react';

const ScrollToTop = () => {
    useEffect(() => {
        const root = document.querySelector('#root');

        root.scrollIntoView({
            behavior: 'smooth',
        }, 200);
    }, []);
    return (
        <></>
    );
};

export default ScrollToTop;
