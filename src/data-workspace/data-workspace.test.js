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

beforeEach(() => {
    useWorkflowContext.mockImplementation(() => ({
        displayName: 'Workflow a',
        id: 'i5m0JPw4DQi',
        periodType: 'Monthly',
        dataSets: [],
        approvalState: 'APPROVED_HERE'
    }))
    useSelectionParams.mockImplementation(() => ({
        pe: '201204',
        ou: 'ImspTQPwCqd'
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
})
