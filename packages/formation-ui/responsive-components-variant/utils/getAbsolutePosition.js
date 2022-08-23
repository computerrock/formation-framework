export default function getAbsolutePosition(el) {
    let found;
    let left = 0;
    let top = 0;
    let width = 0;
    let height = 0;
    let offsetBase = getAbsolutePosition.offsetBase;
    if (!offsetBase && document.body) {
        getAbsolutePosition.offsetBase = document.createElement('div');
        offsetBase = getAbsolutePosition.offsetBase;
        offsetBase.style.cssText = 'position:absolute;left:0;top:0';
        document.body.appendChild(offsetBase);
    }
    if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
        const boundingRect = el.getBoundingClientRect();
        const baseRect = offsetBase.getBoundingClientRect();
        found = true;
        left = boundingRect.left - baseRect.left;
        top = boundingRect.top - baseRect.top;
        width = boundingRect.right - boundingRect.left;
        height = boundingRect.bottom - boundingRect.top;
    }
    return {
        found: found,
        left: left,
        top: top,
        width: width,
        height: height,
        right: left + width,
        bottom: top + height,
    };
}
