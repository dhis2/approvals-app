import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { useQueryParams } from 'use-query-params'
import { useCurrentUser } from '../../current-user/index.js'
import { SelectionProvider } from './selection-provider.js'
import { useSelection } from './use-selection.js'

jest.mock('use-query-params', () => ({
    useQueryParams: jest.fn(),
}))
jest.mock('../../current-user/index.js', () => ({
    useCurrentUser: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('useSelection', () => {
    const mockWorkflows = [
        {
            name: 'Workflow a',
            id: 'i5m0JPw4DQi',
        },
        {
            name: 'Workflow B',
            id: 'rIUL3hYOjJc',
        },
    ]

    const wrapper = ({ children }) => (
        <SelectionProvider>{children}</SelectionProvider>
    )

    it('returns the expected properties', () => {
        useCurrentUser.mockImplementation(() => ({
            dataApprovalWorkflows: mockWorkflows,
        }))
        useQueryParams.mockImplementation(() => [{}, () => {}])

        const { result } = renderHook(() => useSelection(), { wrapper })

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
        useQueryParams.mockImplementation(() => [
            {
                wf: 'rIUL3hYOjJc',
                pe: '20110203',
                ou: 'abc',
            },
            () => {},
        ])

        const { result } = renderHook(() => useSelection(), { wrapper })
        expect(result.current.workflow).toEqual(mockWorkflows[1])
        expect(result.current.period).toEqual({
            code: '20110203',
            name: '20110203',
        })
        expect(result.current.orgUnit).toEqual({ id: 'abc' })
        // TODO: add tests for dealing with invalid query params
        // once that has been implemented
    })

    it('functions returned from the hook update the state and url', () => {
        const setQuery = jest.fn()
        useCurrentUser.mockImplementation(() => ({
            dataApprovalWorkflows: mockWorkflows,
        }))
        useQueryParams.mockImplementation(() => [{}, setQuery])

        const { result } = renderHook(() => useSelection(), { wrapper })
        // Reset count to 0 because the function is also called on initial render
        setQuery.mockClear()

        const expectedOpenedSelect = 'test'
        act(() => {
            result.current.setOpenedSelect(expectedOpenedSelect)
        })
        expect(result.current.openedSelect).toEqual(expectedOpenedSelect)
        // Not captured in URL
        expect(setQuery).toHaveBeenCalledTimes(0)

        const expectedWorkflow = { id: '123' }
        act(() => {
            result.current.selectWorkflow(expectedWorkflow)
        })
        expect(result.current.workflow).toEqual(expectedWorkflow)
        expect(setQuery).toHaveBeenCalledTimes(1)
        setQuery.mockClear()

        const expectedPeriod = { code: '20210202' }
        act(() => {
            result.current.selectPeriod(expectedPeriod)
        })
        expect(result.current.period).toEqual(expectedPeriod)
        expect(setQuery).toHaveBeenCalledTimes(1)
        setQuery.mockClear()

        const expectedOrgUnit = { id: '123' }
        act(() => {
            result.current.selectOrgUnit(expectedOrgUnit)
        })
        expect(result.current.orgUnit).toEqual(expectedOrgUnit)
        expect(setQuery).toHaveBeenCalledTimes(1)
        setQuery.mockClear()

        act(() => {
            result.current.clearAll()
        })
        expect(result.current.openedSelect).toEqual('')
        expect(result.current.workflow).toEqual({})
        expect(result.current.period).toEqual({})
        expect(result.current.orgUnit).toEqual({})
        expect(setQuery).toHaveBeenCalledTimes(1)
        setQuery.mockClear()
    })
})
