import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { CachedResourcesContext } from './cached-resources-context'
import { useCurrentUser, useSystemVersion, useIsAuthorized } from './hooks.js'

describe('useCurrentUser', () => {
    const value = {
        me: {
            authorities: ['dummy'],
        },
    }

    const wrapper = ({ children }) => (
        <CachedResourcesContext.Provider value={value}>
            {children}
        </CachedResourcesContext.Provider>
    )

    it('returns an object with current user properties', () => {
        const { result } = renderHook(() => useCurrentUser(), { wrapper })

        expect(result.current).toEqual(value.me)
    })
})

describe('useSystemVersion', () => {
    const value = {
        systemVersion: '2.37.0',
    }

    const wrapper = ({ children }) => (
        <CachedResourcesContext.Provider value={value}>
            {children}
        </CachedResourcesContext.Provider>
    )

    it('returns the system minor version number', () => {
        const { result } = renderHook(() => useSystemVersion(), { wrapper })

        expect(result.current).toEqual(37)
    })
})

describe('useIsAuthorized', () => {
    it('returns false for unauthorised users', () => {
        const value = {
            me: {
                authorities: ['dummy'],
            },
        }

        const wrapper = ({ children }) => (
            <CachedResourcesContext.Provider value={value}>
                {children}
            </CachedResourcesContext.Provider>
        )

        const { result } = renderHook(() => useIsAuthorized(), { wrapper })

        expect(result.current).toEqual(false)
    })

    it('returns true for authorised users', () => {
        const value = {
            me: {
                authorities: ['M_dhis-web-approval'],
            },
        }

        const wrapper = ({ children }) => (
            <CachedResourcesContext.Provider value={value}>
                {children}
            </CachedResourcesContext.Provider>
        )

        const { result } = renderHook(() => useIsAuthorized(), { wrapper })

        expect(result.current).toEqual(true)
    })

    it('returns true for superusers', () => {
        const value = {
            me: {
                authorities: ['ALL'],
            },
        }

        const wrapper = ({ children }) => (
            <CachedResourcesContext.Provider value={value}>
                {children}
            </CachedResourcesContext.Provider>
        )

        const { result } = renderHook(() => useIsAuthorized(), { wrapper })

        expect(result.current).toEqual(true)
    })
})
