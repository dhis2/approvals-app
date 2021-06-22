import { useContext } from 'react'
import { CurrentUserContext } from './current-user-context.js'

export const useCurrentUser = () => useContext(CurrentUserContext)
