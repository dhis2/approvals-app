import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { AppDataContext } from './app-data-context.js'
import { useAppData } from './use-app-data.js'

describe('useAppData', () => {
    const value = {
        authorities: ['dummy'],
    }

    const wrapper = ({ children }) => (
        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )

    it('returns an object with current user properties', () => {
        const { result } = renderHook(() => useAppData(), { wrapper })

        expect(result.current).toEqual(value)
    })
})
