import { useContext } from 'react'
import { AppDataContext } from './app-data-context.js'

export const useAppData = () => useContext(AppDataContext)
