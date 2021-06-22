import { useContext } from 'react'
import { SelectionContext } from './selection-context.js'

export const useSelection = () => useContext(SelectionContext)
