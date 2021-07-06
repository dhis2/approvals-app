import { Popover, Layer, MenuItem, Tooltip } from '@dhis2/ui'
import { shallow } from 'enzyme'
import React from 'react'
import { useAppContext } from '../../app-context/index.js'
import { readQueryParams } from '../../navigation/read-query-params.js'
import { ContextSelect } from '../context-select/context-select.js'
import { useSelectionContext } from '../selection-context/index.js'
import { PeriodMenu } from './period-menu.js'
import { PERIOD, PeriodSelect } from './period-select.js'
import { YearNavigator } from './year-navigator.js'

jest.mock('../../navigation/read-query-params.js', () => ({
    readQueryParams: jest.fn(),
}))

jest.mock('../../app-context/index.js', () => ({
    useAppContext: jest.fn(),
}))

jest.mock('../selection-context/index.js', () => ({
    useSelectionContext: jest.fn(),
}))

const mockWorkflows = [
    {
        displayName: 'Workflow a',
        id: 'i5m0JPw4DQi',
        periodType: 'Monthly',
    },
    {
        displayName: 'Workflow B',
        id: 'rIUL3hYOjJc',
        periodType: 'Yearly',
    },
]

beforeEach(() => {
    useAppContext.mockImplementation(() => ({
        dataApprovalWorkflows: mockWorkflows,
    }))
    readQueryParams.mockImplementation(() => ({}))
})

afterEach(() => {
    jest.resetAllMocks()
})

describe('<PeriodSelect>', () => {
    it('renders a ContextSelect with YearNavigator and PeriodMenu', () => {
        useSelectionContext.mockImplementation(() => ({
            workflow: mockWorkflows[0],
            period: {},
            openedSelect: '',
            selectPeriod: () => {},
            setOpenedSelect: () => {},
        }))
        const wrapper = shallow(<PeriodSelect />)

        expect(wrapper.type()).toBe(ContextSelect)
        expect(wrapper.find(YearNavigator)).toHaveLength(1)
        expect(wrapper.find(PeriodMenu)).toHaveLength(1)
    })

    it('renders a placeholder text when no period is selected', () => {
        useSelectionContext.mockImplementation(() => ({
            workflow: mockWorkflows[0],
            period: {},
            openedSelect: '',
            selectPeriod: () => {},
            setOpenedSelect: () => {},
        }))
        const wrapper = shallow(<PeriodSelect />)

        expect(wrapper.find(ContextSelect).prop('value')).toBe(
            'Choose a period'
        )
    })

    it('renders a the value when a period is selected', () => {
        const displayName = 'April 2012'

        useSelectionContext.mockImplementation(() => ({
            workflow: mockWorkflows[0],
            period: {
                id: '201204',
                displayName,
            },
            openedSelect: '',
            selectPeriod: () => {},
            setOpenedSelect: () => {},
        }))
        const wrapper = shallow(<PeriodSelect />)

        expect(wrapper.find(ContextSelect).prop('value')).toBe(displayName)
    })

    it('opens the ContextSelect when the opened select matches "PERIOD"', () => {
        useSelectionContext.mockImplementation(() => ({
            workflow: mockWorkflows[0],
            period: {},
            openedSelect: PERIOD,
            selectPeriod: () => {},
            setOpenedSelect: () => {},
        }))
        const wrapper = shallow(<PeriodSelect />)

        expect(wrapper.find(ContextSelect).prop('open')).toBe(true)
    })

    it('calls the setOpenedSelect to open when clicking the ContextSelect button', () => {
        const setOpenedSelect = jest.fn()
        useSelectionContext.mockImplementation(() => ({
            workflow: mockWorkflows[0],
            period: {},
            openedSelect: PERIOD,
            selectPeriod: () => {},
            setOpenedSelect,
        }))
        shallow(<PeriodSelect />)
            .find(ContextSelect)
            .dive()
            .find('button')
            .simulate('click')

        expect(setOpenedSelect).toHaveBeenCalledTimes(1)
        expect(setOpenedSelect).toHaveBeenCalledWith(PERIOD)
    })

    it('calls selectPeriod when clicking a MenuItem', () => {
        const selectPeriod = jest.fn()
        useSelectionContext.mockImplementation(() => ({
            workflow: mockWorkflows[0],
            period: {
                id: '201204',
                displayName: 'April 2012',
                year: 2012,
            },
            orgUnit: {},
            openedSelect: PERIOD,
            selectPeriod,
            setOpenedSelect: () => {},
        }))

        shallow(<PeriodSelect />)
            .find(PeriodMenu)
            .dive()
            .find(MenuItem)
            .first()
            .simulate('click')

        expect(selectPeriod).toHaveBeenCalledTimes(1)
        expect(selectPeriod).toHaveBeenCalledWith({
            displayName: 'January 2012',
            endDate: '2012-01-31',
            id: '201201',
            iso: '201201',
            startDate: '2012-01-01',
        })
    })

    it('calls the setOpenedSelect to close when clicking the backdrop', () => {
        const setOpenedSelect = jest.fn()
        useSelectionContext.mockImplementation(() => ({
            workflow: mockWorkflows[0],
            period: {},
            openedSelect: PERIOD,
            selectPeriod: () => {},
            setOpenedSelect,
        }))

        shallow(<PeriodSelect />)
            .find(ContextSelect)
            .dive()
            .find(Popover)
            .dive()
            .find(Layer)
            .simulate('click')

        expect(setOpenedSelect).toHaveBeenCalledTimes(1)
        expect(setOpenedSelect).toHaveBeenCalledWith('')
    })

    it('displays the correct tooltip text when period has not been set yet', () => {
        useSelectionContext.mockImplementation(() => ({
            workflow: {},
            period: {},
            orgUnit: {},
            openedSelect: '',
            selectWorkflow: () => {},
            setOpenedSelect: () => {},
        }))

        const wrapper = shallow(<PeriodSelect />)
        const tooltip = wrapper.find(ContextSelect).dive().find(Tooltip)

        expect(tooltip.prop('content')).toBe('Choose a workflow first')
    })
})
