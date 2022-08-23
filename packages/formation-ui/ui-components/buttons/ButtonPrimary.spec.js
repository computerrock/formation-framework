import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {enzyme, render,sinon} from '../utils/test/test-utils';
import ButtonPrimary from "./ButtonPrimary";

const classNameDefault='ace-c-button-primary'
const classNameIsDisabled='ace-c-button-primary--is-disabled'

describe('Button primary Render tests', ()=>{
    //let innerText='Button Primary'
    let element

    it('rendered element should have valid className default', function () {
        element=render(<ButtonPrimary/>)
        expect(element.container.firstChild).toHaveClass(classNameDefault)
    });

    it('rendered element should have valid className when isSelected attribute have value true', function () {
        element=render(<ButtonPrimary isDisabled={true}/>)
        expect(element.container.firstChild).toHaveClass(classNameIsDisabled)
    });

})


describe('ButtonPrimary Component Actions',()=>{
    it('simulate click on enabled button and check is button clicked',function (){
        const onClickCounter=sinon.spy()
        let wrapper=enzyme.mount(<ButtonPrimary onClick={onClickCounter}/>)
        wrapper.find('button').simulate('click')
        expect(onClickCounter.callCount).toEqual(1)
    });

    it('simulate click on disabled button and check is button not clicked',function (){
        const onClickCounter=sinon.spy()
        let wrapper=enzyme.mount(<ButtonPrimary onClick={onClickCounter} isDisabled={true}/>)
        wrapper.find('button').simulate('click')
        expect(onClickCounter.callCount).toEqual(0)
    })

    it('simulate click on submit button and check is form submitted',function (){
        //ToDo check is this good practice
        const onClickCounter=sinon.spy()
        let wrapper=enzyme.mount(<form onSubmit={onClickCounter}><ButtonPrimary type={'submit'}/></form>)
        wrapper.find('button').simulate('submit')
        expect(onClickCounter.callCount).toEqual(1)
    })
    it('simulate click on reset button and check is reset action triggered',function (){
        //ToDo check is this good practice
        const onClickCounter=sinon.spy()
        let wrapper=enzyme.mount(<form onReset={onClickCounter}><ButtonPrimary type={'reset'}/></form>)
        wrapper.find('button').simulate('reset')
        expect(onClickCounter.callCount).toEqual(1)
    })
})

