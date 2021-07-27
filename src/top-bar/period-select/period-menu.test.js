import { MenuItem, Menu } from '@dhis2/ui'
import { shallow } from 'enzyme'
import React from 'react'
import { useSelectionContext } from '../../selection-context/index.js'
import { PeriodMenu } from './period-menu.js'

jest.mock('../../selection-context/index.js', () => ({
    useSelectionContext: jest.fn(),
}))

describe('<PeriodMenu>', () => {
    it('renders MenuItems with the expected periods', () => {
        useSelectionContext.mockImplementation(() => ({
            selectPeriod: () => {},
            workflow: {},
            period: {},
            orgUnit: {},
        }))
        const wrapper = shallow(<PeriodMenu periodType="Monthly" year={2018} />)

        expect(wrapper.find(Menu)).toHaveLength(1)
        expect(wrapper.find(MenuItem)).toHaveLength(12)
        expect(wrapper.find(MenuItem)).toMatchSnapshot()
    })

    it('sets MenuItem active state when active', () => {
        useSelectionContext.mockImplementation(() => ({
            selectPeriod: () => {},
            workflow: {
                id: '123',
            },
            period: {
                id: '201804',
            },
            orgUnit: {},
        }))
        const wrapper = shallow(<PeriodMenu periodType="Monthly" year={2018} />)
        const activeMenuItem = wrapper.findWhere(
            n => n.type() === MenuItem && n.prop('active') === true
        )

        expect(activeMenuItem).toHaveLength(1)
        expect(activeMenuItem.prop('active')).toBe(true)
        expect(activeMenuItem.prop('label')).toBe('April 2018')
    })

    it('calls selectPeriod when MenuItem is clicked', () => {
        const selectPeriod = jest.fn()
        useSelectionContext.mockImplementation(() => ({
            selectPeriod,
            workflow: {},
            period: {},
            orgUnit: {},
        }))
        const wrapper = shallow(<PeriodMenu periodType="Monthly" year={2018} />)

        wrapper.find(MenuItem).first().simulate('click')

        expect(selectPeriod).toHaveBeenCalledTimes(1)
        expect(selectPeriod).toHaveBeenCalledWith({
            displayName: 'January 2018',
            endDate: '2018-01-31',
            id: '201801',
            iso: '201801',
            startDate: '2018-01-01',
        })
    })
})
