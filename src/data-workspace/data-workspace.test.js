import React from 'react'
import { shallow } from 'enzyme'
import { DataWorkspace } from './data-workspace.js'
import { TitleBar } from './title-bar/index.js'
import { DataSetNavigation } from './data-set-navigation/index.js'
import { Display } from './display/index.js'
import { useWorkflowContext } from '../workflow-context/index.js'
import { useSelectionParams } from '../workflow-context/use-selection-params.js'

jest.mock('../workflow-context/index.js', () => ({
    useWorkflowContext: jest.fn(),
}))

jest.mock('../workflow-context/use-selection-params.js', () => ({
    useSelectionParams: jest.fn(),
}))

const mockDataSets = [{
    id: 'data-set-1',
    displayName: 'Data set 1',
    periodType: 'Monthly'
}, {
    id: 'data-set-2',
    displayName: 'Data set 2',
    periodType: 'Monthly'
}]

const mockUseWorkflowContext = (workflow = {}) => {
    useWorkflowContext.mockImplementation(() => ({
        displayName: 'Workflow a',
        id: 'i5m0JPw4DQi',
        periodType: 'Monthly',
        dataSets: [],
        approvalState: 'APPROVED_HERE',
        ...workflow
    }))
}

beforeEach(() => {
    mockUseWorkflowContext()
    useSelectionParams.mockImplementation(() => ({
        pe: '201204',
        ou: 'ImspTQPwCqd',
    }))
})

afterEach(() => {
    jest.resetAllMocks()
})

describe('<DataWorkspace>', () => {
    it('renders a TitleBar, DataSetNavigation and Display', () => {
        const wrapper = shallow(<DataWorkspace />)

        expect(wrapper.find(TitleBar)).toHaveLength(1)
        expect(wrapper.find(DataSetNavigation)).toHaveLength(1)
        expect(wrapper.find(Display)).toHaveLength(1)
    })

    it('if there is only one data set, select it automatically', () => {
        const dataSet = mockDataSets[0]
        mockUseWorkflowContext({
            dataSets: [dataSet]
        })
        const wrapper = shallow(<DataWorkspace />)

        expect(wrapper.find(DataSetNavigation).prop('selected')).toBe(dataSet.id)
        expect(wrapper.find(Display).prop('dataSetId')).toBe(dataSet.id)
    })

    it('if there is more than one data set, do not select one automatically', () => {
        mockUseWorkflowContext({
            dataSets: mockDataSets
        })
        const wrapper = shallow(<DataWorkspace />)

        expect(wrapper.find(DataSetNavigation).prop('selected')).toBe(null)
        expect(wrapper.find(Display).prop('dataSetId')).toBe(null)
    })
})
