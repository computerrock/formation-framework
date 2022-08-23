import {useEffect, useRef} from 'react';
import debounce from 'lodash.debounce';

const useFocusSwitch = ({ref, onFocusSwitch, onClickOutside, onKeyboardCancel, onDocumentScroll}) => {
    const componentRef = useRef(null);
    if (typeof onFocusSwitch === 'function') {
        onClickOutside = onFocusSwitch;
        onKeyboardCancel = onFocusSwitch;
        onDocumentScroll = onFocusSwitch;
    }

    useEffect(() => {
        let targetRefs = ref || componentRef;
        targetRefs = [...(Array.isArray(targetRefs) ? targetRefs : [targetRefs])];

        const handleKeyDown = event => {
            if (event.key === 'Escape' || event.key === 'Tab' || event.key === ' ') {
                onKeyboardCancel();
            }
        };

        const handleClick = event => {
            if (!targetRefs.reduce((isTargetInFocus, targetRefs) => {
                return (targetRefs.current && targetRefs.current.contains(event.target)) || isTargetInFocus;
            }, false)) {
                onClickOutside();
            }
        };

        const handleScroll = debounce(event => {
            if (!targetRefs.reduce((isTargetInFocus, targetRef) => {
                return (targetRef.current && targetRef.current.contains(event.target)) || isTargetInFocus;
            }, false)) {
                onDocumentScroll();
                document.removeEventListener('scroll', handleScroll, true);
            }
        });

        if (typeof onFocusSwitch === 'function' || typeof onClickOutside === 'function') {
            document.addEventListener('click', handleClick, true);
        }
        if (typeof onFocusSwitch === 'function' || typeof onKeyboardCancel === 'function') {
            document.addEventListener('keydown', handleKeyDown, true);
        }
        if (typeof onFocusSwitch === 'function' || typeof onDocumentScroll === 'function') {
            document.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            if (typeof onFocusSwitch === 'function' || typeof onClickOutside === 'function') {
                document.removeEventListener('click', handleClick, true);
            }
            if (typeof onFocusSwitch === 'function' || typeof onKeyboardCancel === 'function') {
                document.removeEventListener('keydown', handleKeyDown, true);
            }
            if (typeof onFocusSwitch === 'function' || typeof onDocumentScroll === 'function') {
                document.removeEventListener('scroll', handleScroll, true);
            }
        };
    }, [ref, onFocusSwitch, onClickOutside, onKeyboardCancel, onDocumentScroll]);


    return {ref: ref || componentRef};
};

export default useFocusSwitch;
