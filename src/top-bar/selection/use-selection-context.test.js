import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { useCurrentUser } from '../../current-user/index.js'
import { history } from '../../navigation/history.js'
import { readQueryParams } from '../../navigation/read-query-params.js'
import { SelectionProvider } from './selection-provider.js'
import { useSelectionContext } from './use-selection-context.js'

jest.mock('../../navigation/history.js', () => {
    const actualHistoryModule = jest.requireActual(
        '../../navigation/history.js'
    )
    return {
        history: {
            ...actualHistoryModule.history,
            push: jest.fn(),
        },
    }
})

jest.mock('../../navigation/read-query-params.js', () => ({
    readQueryParams: jest.fn(),
}))

jest.mock('../../current-user/index.js', () => ({
    useCurrentUser: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('useSelectionContext', () => {
    const mockWorkflows = [
        {
            displayName: 'Workflow a',
            id: 'i5m0JPw4DQi',
            periodType: 'Daily',
        },
        {
            displayName: 'Workflow B',
            id: 'rIUL3hYOjJc',
            periodType: 'Daily',
        },
    ]

    const wrapper = ({ children }) => (
        <SelectionProvider>{children}</SelectionProvider>
    )

    it('returns the expected properties', () => {
        useCurrentUser.mockImplementation(() => ({
            dataApprovalWorkflows: mockWorkflows,
        }))
        readQueryParams.mockImplementation(() => ({}))

        const { result } = renderHook(() => useSelectionContext(), { wrapper })

        expect(result.current).toEqual(
            expect.objectContaining({
                workflow: expect.any(Object),
                period: expect.any(Object),
                orgUnit: expect.any(Object),
                openedSelect: expect.any(String),
                clearAll: expect.any(Function),
                setOpenedSelect: expect.any(Function),
                selectWorkflow: expect.any(Function),
                selectPeriod: expect.any(Function),
                selectOrgUnit: expect.any(Function),
            })
        )
    })

    it('populates properties from query params', () => {
        useCurrentUser.mockImplementation(() => ({
            dataApprovalWorkflows: mockWorkflows,
        }))
        readQueryParams.mockImplementation(() => ({
            wf: 'rIUL3hYOjJc',
            pe: '20110203',
            ou: 'abc',
        }))

        const { result } = renderHook(() => useSelectionContext(), { wrapper })
        expect(result.current.workflow).toEqual(mockWorkflows[1])
        expect(result.current.period).toEqual(
            expect.objectContaining({
                id: '20110203',
                displayName: '2011-02-03',
            })
        )
        expect(result.current.orgUnit).toEqual({ id: 'abc' })
        // TODO: add tests for dealing with invalid query params
        // once that has been implemented
    })

    it('functions returned from the hook update the state and url', () => {
        const push = jest.fn()
        useCurrentUser.mockImplementation(() => ({
            dataApprovalWorkflows: mockWorkflows,
        }))
        readQueryParams.mockImplementation(() => ({}))
        history.push.mockImplementation(push)

        const { result } = renderHook(() => useSelectionContext(), { wrapper })
        // Reset count to 0 because the function is also called on initial render
        push.mockClear()

        const expectedOpenedSelect = 'test'
        act(() => {
            result.current.setOpenedSelect(expectedOpenedSelect)
        })
        expect(result.current.openedSelect).toEqual(expectedOpenedSelect)
        // Not captured in URL
        expect(push).toHaveBeenCalledTimes(0)

        const expectedWorkflow = { id: '123' }
        act(() => {
            result.current.selectWorkflow(expectedWorkflow)
        })
        expect(result.current.workflow).toEqual(expectedWorkflow)
        expect(push).toHaveBeenCalledTimes(1)
        push.mockClear()

        const expectedPeriod = { id: '20210202' }
        act(() => {
            result.current.selectPeriod(expectedPeriod)
        })
        expect(result.current.period).toEqual(expectedPeriod)
        expect(push).toHaveBeenCalledTimes(1)
        push.mockClear()

        const expectedOrgUnit = { id: '123' }
        act(() => {
            result.current.selectOrgUnit(expectedOrgUnit)
        })
        expect(result.current.orgUnit).toEqual(expectedOrgUnit)
        expect(push).toHaveBeenCalledTimes(1)
        push.mockClear()

        act(() => {
            result.current.clearAll()
        })
        expect(result.current.openedSelect).toEqual('')
        expect(result.current.workflow).toEqual({})
        expect(result.current.period).toEqual({})
        expect(result.current.orgUnit).toEqual({})
        expect(push).toHaveBeenCalledTimes(1)
        push.mockClear()
    })
})
