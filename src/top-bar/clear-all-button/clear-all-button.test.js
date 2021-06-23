import { shallow } from 'enzyme'
import React from 'react'
import { useSelection } from '../selection/use-selection.js'
import { ClearAllButton } from './clear-all-button.js'

jest.mock('../selection/use-selection.js', () => ({
    useSelection: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<ClearAllButton>', () => {
    it('renders a button when workflow, period and org-unit are set', () => {
        useSelection.mockImplementation(() => ({
            workflow: {
                id: '123',
            },
            period: {
                code: '20110203',
            },
            orgUnit: {
                id: 'abc',
            },
        }))
        const wrapper = shallow(<ClearAllButton />)
        const button = wrapper.dive().find({
            'data-test': 'dhis2-uicore-button',
        })
        expect(button).toHaveLength(1)
    })

    it('renders a button when workflow and period are set', () => {
        useSelection.mockImplementation(() => ({
            workflow: {
                id: '123',
            },
            period: {
                code: '20110203',
            },
            orgUnit: {},
        }))
        const wrapper = shallow(<ClearAllButton />)
        const button = wrapper.dive().find({
            'data-test': 'dhis2-uicore-button',
        })
        expect(button).toHaveLength(1)
    })

    it('renders nothing when only workflow is set', () => {
        useSelection.mockImplementation(() => ({
            workflow: {
                id: '123',
            },
            period: {},
            orgUnit: {},
        }))
        const wrapper = shallow(<ClearAllButton />)
        expect(wrapper.type()).toEqual(null)
    })

    it('renders nothing when all properties are unset', () => {
        useSelection.mockImplementation(() => ({
            workflow: {},
            period: {},
            orgUnit: {},
        }))
        const wrapper = shallow(<ClearAllButton />)
        expect(wrapper.type()).toEqual(null)
    })

    it('calls clearAll when clicked', () => {
        const clearAll = jest.fn()
        useSelection.mockImplementation(() => ({
            clearAll,
            workflow: {
                id: '123',
            },
            period: {
                code: '20110203',
            },
            orgUnit: {},
        }))

        shallow(<ClearAllButton />)
            .dive()
            .find({
                'data-test': 'dhis2-uicore-button',
            })
            .simulate('click')

        expect(clearAll).toHaveBeenCalledTimes(1)
    })
})
