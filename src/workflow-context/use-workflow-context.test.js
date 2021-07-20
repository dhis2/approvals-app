import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
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
    useDataQuery: jest.fn(() => ({
        loading: false,
        error: null,
        data: {
            approvalStatus: {
                state: 'SOME_STATE_LABEL',
                canApprove: true,
            },
        },
        called: true,
        refetch: () => {},
    })),
}))

describe('useWorkflowContext', () => {
    const wrapper = ({ children }) => (
        <WorkflowProvider>{children}</WorkflowProvider>
    )
    it('combines data from various hooks', () => {
        const { result } = renderHook(() => useWorkflowContext(), { wrapper })

        expect(result.current.refresh).toBeInstanceOf(Function)
        expect(result.current).toEqual(
            expect.objectContaining({
                allowedActions: {
                    canApprove: true,
                },
                approvalState: 'SOME_STATE_LABEL',
                dataSets: [
                    {
                        displayName: 'Dataset Z',
                        id: '123',
                    },
                ],
                displayName: 'Workflow a',
                params: {
                    ou: '456',
                    pe: '20120404',
                    wf: 'rIUL3hYOjJc',
                },
            })
        )
    })
})
