import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {enzyme, render} from '../utils/test/test-utils';
import TestComponent from "./TestComponent";

const classNameDefault='ace-c-checkbox--no-chrome'
const classNameIsSelected='ace-c-checkbox--is-selected'
const classNameIsDisabled='ace-c-checkbox--is-disabled'

describe('Test Component Render tests', ()=>{
    let innerText='Test checkbox'
    let element

    it('rendered element should have valid className default', function () {
        element=render(<TestComponent/>).queryByDataQa('checkbox_label')
        expect(element).toHaveClass(classNameDefault)
    });

    it('rendered element should have valid className when isSelected attribute have value true', function () {
        element=render(<TestComponent isSelected={true}/>).queryByDataQa('checkbox_label')
        expect(element).toHaveClass(classNameIsSelected)
    });

    it('rendered element should have valid className when isDisabled attribute have value true', function () {
        element=render(<TestComponent isDisabled={true}/>).queryByDataQa('checkbox_label')
        expect(element).toHaveClass(classNameIsDisabled)
    });

    it('rendered element should have valid text innerHtml', function () {
        element=render(<TestComponent>{innerText}</TestComponent>).queryByDataQa('checkbox_label')
        expect(element).toHaveTextContent(innerText)
    });

    it('rendered element should have valid text when is filled with children attribute', function () {
        element=render(<TestComponent children={innerText}/>).queryByDataQa('checkbox_label')
        expect(element).toHaveTextContent(innerText)
    });
    it('rendered element should have element added by children attribute', function () {
        let newElement=<div data-qa={'test_new_element'}>Hello</div>
        element=render(<TestComponent children={newElement}/>).queryByDataQa('test_new_element')
        expect(element).toHaveTextContent('Hello')
    });
})


describe('Test Component Actions',()=>{
    it('element should have valid className on action "change" ( checked: true )',function (){
        let wrapper=enzyme.mount(<TestComponent/>)
        wrapper.find('input').simulate('change',{target: {checked: true}})
        let label=wrapper.find('label').instance()
        expect(label).toHaveClass(classNameIsSelected)
    });

    it('component should not change className on action "change" when "isDisabled" attribute have value true',function (){
        let wrapper=enzyme.mount(<TestComponent isDisabled={true} />)
        wrapper.find('input').simulate('change',{target: {checked: true}})
        let label=wrapper.find('label').instance()
        expect(label).toHaveClass(classNameIsDisabled)
    })

    it('component should  have valid className on action "change" when "isSelected" attribute have value true',function (){
        let wrapper=enzyme.mount(<TestComponent isSelected={true} />)
        wrapper.find('input').simulate('change',{target: {checked: true}})
        let label=wrapper.find('label').instance()
        expect(label).toHaveClass(classNameDefault)
    })
})

