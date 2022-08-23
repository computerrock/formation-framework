import { queryHelpers, buildQueries } from '@testing-library/react'

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataQa = (...args) =>
    queryHelpers.queryAllByAttribute('data-qa', ...args)

const getMultipleError = (c, dataQaValue) =>
    `Found multiple elements with the data-qa attribute of: ${dataQaValue}`
const getMissingError = (c, dataQaValue) =>
    `Unable to find an element with the data-qa attribute of: ${dataQaValue}`

const [
    queryByDataQa,
    getAllByDataQa,
    getByDataQa,
    findAllByDataQa,
    findByDataQa,
] = buildQueries(queryAllByDataQa, getMultipleError, getMissingError)

export const customQueries= {
    queryByDataQa,
    queryAllByDataQa,
    getByDataQa,
    getAllByDataQa,
    findAllByDataQa,
    findByDataQa,
}
