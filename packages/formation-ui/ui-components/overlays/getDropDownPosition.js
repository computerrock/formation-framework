import {positions} from '@computerrock/formation-ui/overlays';

export const validateDirection = (dropDownTriggerElem, dropDownElem, direction) => {
    const dropDownTriggerRect = dropDownTriggerElem.getBoundingClientRect();
    const dropDownRect = dropDownElem.getBoundingClientRect();

    const isDirectionTopValid = dropDownTriggerRect.top > dropDownRect.height;
    const isDirectionBottomValid = window.innerHeight - dropDownTriggerRect.bottom > dropDownRect.height;

    if (isDirectionTopValid && direction === positions.DIRECTION_TOP) return positions.DIRECTION_TOP;
    if (isDirectionBottomValid && direction === positions.DIRECTION_BOTTOM) return positions.DIRECTION_BOTTOM;

    return (isDirectionBottomValid && positions.DIRECTION_BOTTOM)
        || (isDirectionTopValid && positions.DIRECTION_TOP)
        || positions.DIRECTION_BOTTOM;
};

export const validateAlignment = (dropDownTriggerElem, dropDownElem, alignment) => {
    const dropDownTriggerRect = dropDownTriggerElem.getBoundingClientRect();
    const dropDownRect = dropDownElem.getBoundingClientRect();

    const isAlignmentStartValid = window.innerWidth - dropDownTriggerRect.left > dropDownRect.width;
    const isAlignmentEndValid = dropDownTriggerRect.right > dropDownRect.width;

    if (isAlignmentStartValid && alignment === positions.ALIGNMENT_START) return positions.ALIGNMENT_START;
    if (isAlignmentEndValid && alignment === positions.ALIGNMENT_END) return positions.ALIGNMENT_END;

    return (isAlignmentStartValid && positions.ALIGNMENT_START)
        || (isAlignmentEndValid && positions.ALIGNMENT_END)
        || positions.ALIGNMENT_START;
};

export const getDropDownPosition = ({
    dropDownTriggerElem,
    dropDownElem,
    direction = positions.DIRECTION_BOTTOM,
    alignment = positions.ALIGNMENT_START,
}) => {
    if (!dropDownElem || !dropDownTriggerElem) return positions.DEFAULT_POSITION;

    const validDirection = validateDirection(dropDownTriggerElem, dropDownElem, direction);
    const validAlignment = validateAlignment(dropDownTriggerElem, dropDownElem, alignment);
    const dropDownTriggerRect = dropDownTriggerElem.getBoundingClientRect();
    const dropDownRect = dropDownElem.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    return {
        ...(validDirection === positions.DIRECTION_BOTTOM && {
            top: dropDownTriggerRect.bottom + scrollTop,
        }),
        ...(validDirection === positions.DIRECTION_TOP && {
            bottom: window.innerHeight - dropDownTriggerRect.top - scrollTop,
        }),
        left: validAlignment === positions.ALIGNMENT_START ? dropDownTriggerRect.left
            : dropDownTriggerRect.right - dropDownRect.width,
    };
};

export default getDropDownPosition;
