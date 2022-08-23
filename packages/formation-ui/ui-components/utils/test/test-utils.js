import { render } from '@testing-library/react'
import {customQueries} from "./custom-queries";

import Enzyme from 'enzyme';
/**
 * https://stackoverflow.com/a/64597067 - React version and enzyme Adapter issue - for mount shallow functions ( Also solution for HOC based components)
 * @property Adapter
 */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
const sinon =require('sinon');

const customRender = (ui, options) =>
    render(ui, { queries:{ ...customQueries}, ...options })


Enzyme.configure({ adapter: new Adapter() });

export * from '@testing-library/react'
export { customRender as render }
export {Enzyme as enzyme}
export {sinon}
