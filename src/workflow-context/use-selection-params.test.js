import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { history } from '../navigation/history.js'
import { readQueryParams } from '../navigation/read-query-params.js'
import {
    useSelectionParams,
    getParamsIfAllAvailable,
} from './use-selection-params.js'
import { WorkflowProvider } from './workflow-provider.js'

jest.mock('../navigation/read-query-params.js', () => ({
    readQueryParams: jest.fn(() => ({})),
}))

describe('useSelectionParams', () => {
    const wrapper = ({ children }) => (
        <WorkflowProvider>{children}</WorkflowProvider>
    )
    it('responds to history changes', () => {
        const spy = jest.spyOn(history, 'listen')
        renderHook(() => useSelectionParams(), { wrapper })

        act(() => {
            history.push({
                pathname: '/',
                search: `?wf=123&pe=456&ou=789`,
            })
        })

        expect(spy).toHaveBeenCalledTimes(1)
    })
})

describe('getParamsIfAllAvailable', () => {
    it('returns an object if all required query params are found', () => {
        readQueryParams.mockImplementationOnce(() => ({
            wf: '123',
            pe: '123',
            ou: '/123/456',
        }))
        expect(getParamsIfAllAvailable()).toEqual({
            ou: '456',
            pe: '123',
            wf: '123',
        })
    })
    it('returns null if query params are only partially complete', () => {
        readQueryParams.mockImplementationOnce(() => ({
            wf: '123',
            pe: '123',
        }))
        expect(getParamsIfAllAvailable()).toEqual(null)
    })
    it('returns null if no query params are found', () => {
        readQueryParams.mockImplementationOnce(() => ({}))
        expect(getParamsIfAllAvailable()).toEqual(null)
    })
})
