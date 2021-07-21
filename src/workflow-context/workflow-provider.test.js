import { useDataQuery } from '@dhis2/app-runtime'
import { renderHook } from '@testing-library/react-hooks'
import { shallow } from 'enzyme'
import React from 'react'
import { ErrorMessage, Loader } from '../shared/index.js'
import { useSelectionParams } from './use-selection-params.js'
import { useWorkflowContext } from './use-workflow-context.js'
import { WorkflowProvider } from './workflow-provider.js'

jest.mock('./use-selection-params.js', () => ({
    useSelectionParams: jest.fn(() => ({
        wf: 'rIUL3hYOjJc',
        pe: '20120404',
        ou: '456',
    })),
}))

jest.mock('./use-selected-workflow.js', () => ({
    useSelectedWorkflow: jest.fn(() => ({
        displayName: 'Workflow a',
        id: 'i5m0JPw4DQi',
        periodType: 'Daily',
        dataSets: [{ id: '123', displayName: 'Dataset Z' }],
    })),
}))

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

describe('<AppProvider>', () => {
    it('shows a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({
            loading: true,
            refetch: () => {},
            called: true,
        }))

        const wrapper = shallow(<WorkflowProvider>Child</WorkflowProvider>)

        expect(wrapper.find(Loader)).toHaveLength(1)
    })

    it('shows an error message if there is a loading error', () => {
        const message = 'Something went wrong'
        const error = new Error(message)

        useDataQuery.mockImplementation(() => ({
            loading: false,
            called: true,
            refetch: () => {},
            error,
        }))

        const wrapper = shallow(<WorkflowProvider>Child</WorkflowProvider>)

        expect(wrapper.find(ErrorMessage)).toHaveLength(1)
    })

    it('renders the children once data has been received', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            called: true,
            data: {
                approvalStatus: {
                    state: 'SOME_STATE_LABEL',
                    canApprove: true,
                },
            },
        }))

        const wrapper = shallow(<WorkflowProvider>Child</WorkflowProvider>)

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })

    it('renders a loading spinner if called is false', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            refetch: () => {},
            called: false,
        }))

        const wrapper = shallow(<WorkflowProvider>Child</WorkflowProvider>)

        expect(wrapper.find(Loader)).toHaveLength(1)
    })

    it('renders null if params is null', () => {
        useSelectionParams.mockImplementationOnce(() => null)
        useDataQuery.mockImplementation(() => ({
            loading: true,
            refetch: () => {},
            called: true,
        }))

        const wrapper = shallow(<WorkflowProvider>Child</WorkflowProvider>)

        expect(wrapper.type()).toBe(null)
    })

    it('refetches when the "refresh" callback is called', async () => {
        const refetch = jest.fn()

        useDataQuery.mockImplementation(() => ({
            refetch,
            error: null,
            loading: false,
            called: true,
            data: {
                approvalStatus: {
                    state: 'APPROVABLE',
                    mayApprove: true,
                },
            },
        }))

        const wrapper = WorkflowProvider
        const { result } = renderHook(useWorkflowContext, { wrapper })

        expect(refetch).toHaveBeenCalledTimes(1) // initially called once
        result.current.refresh()
        expect(refetch).toHaveBeenCalledTimes(2)
    })
})
