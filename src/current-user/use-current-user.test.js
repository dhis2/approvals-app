import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { CurrentUserContext } from './current-user-context'
import { useCurrentUser } from './use-current-user'

describe('useCurrentUser', () => {
    const value = {
        authorities: ['dummy'],
    }

    const wrapper = ({ children }) => (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )

    it('returns an object with current user properties', () => {
        const { result } = renderHook(() => useCurrentUser(), { wrapper })

        expect(result.current).toEqual(value)
    })
})
