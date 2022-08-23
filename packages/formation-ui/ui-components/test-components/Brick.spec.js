import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {render} from '../utils/test/test-utils';
import Brick from "./Brick";

describe('Render tests', ()=>{
    const innerText='Brick!'
    const className='ace-c-brick'
    let element
    it('rendered element should have valid className', function () {
        element=render(<Brick/>);
        expect(element.container.firstChild).toHaveClass(className)
    });
    it('rendered element should have valid text', function () {
        element=render(<Brick>{innerText}</Brick>);
        expect(element.container).toHaveTextContent(innerText)
    });
})
