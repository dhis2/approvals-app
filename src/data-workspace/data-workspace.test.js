import { shallow } from 'enzyme'
import React from 'react'
import { useSelectionContext } from '../selection-context/index.js'
import { useWorkflowContext } from '../workflow-context/index.js'
import { DataSetNavigation } from './data-set-navigation/index.js'
import { DataWorkspace } from './data-workspace.js'
import { Display } from './display/index.js'
import { TitleBar } from './title-bar/index.js'

jest.mock('../selection-context/use-selection-context.js', () => ({
    useSelectionContext: jest.fn(),
}))

describe('<DataWorkspace>', () => {
    const workflow = {
        displayName: 'Workflow a',
        id: 'i5m0JPw4DQi',
        periodType: 'Monthly',
        dataSets: [
            {
                id: 'data-set-1',
                displayName: 'Data set 1',
                periodType: 'Monthly',
            },
            {
                id: 'data-set-2',
                displayName: 'Data set 2',
                periodType: 'Monthly',
            },
        ],
    }

    useSelectionContext.mockImplementation(() => ({ workflow }))

    it('renders a TitleBar, DataSetNavigation and Display', () => {
        const wrapper = shallow(<DataWorkspace />)

        expect(wrapper.find(TitleBar)).toHaveLength(1)
        expect(wrapper.find(DataSetNavigation)).toHaveLength(1)
        expect(wrapper.find(Display)).toHaveLength(1)
    })

    it('if there is only one data set, select it automatically', () => {
        useSelectionContext.mockImplementationOnce(() => ({
            workflow: {
                dataSets: [{
                    id: 'data-set-1',
                    displayName: 'Data set 1',
                    periodType: 'Monthly',
                }],
                displayName: 'Workflow a',
                id: 'i5m0JPw4DQi',
                periodType: 'Monthly',
            },
        }))
        const wrapper = shallow(<DataWorkspace />)

        expect(wrapper.find(DataSetNavigation).prop('selected')).toBe(
            workflow.dataSets[0].id
        )
        expect(wrapper.find(Display).prop('dataSetId')).toBe(workflow.dataSets[0].id)
    })

    it('if there is more than one data set, do not select one automatically', () => {
        const wrapper = shallow(<DataWorkspace />)

        expect(
            wrapper.find(DataSetNavigation).prop('selected')
        ).toBe(null)
        expect(wrapper.find(DataSetNavigation).prop('selected')).toBe(null)
        expect(wrapper.find(Display).prop('dataSetId')).toBe(null)
    })

    it('if there are no data sets, selection should be empty', () => {
        useSelectionContext.mockImplementationOnce(() => ({
            workflow: {
                dataSets: [],
                displayName: 'Workflow a',
                id: 'i5m0JPw4DQi',
                periodType: 'Monthly',
            },
        }))
        const wrapper = shallow(<DataWorkspace />)

        expect(wrapper.find(DataSetNavigation).prop('selected')).toBe(null)
        expect(wrapper.find(Display).prop('dataSetId')).toBe(null)
    })
})
