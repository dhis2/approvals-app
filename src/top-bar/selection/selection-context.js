import { createContext } from 'react'

const defaultFn = () => {
    throw new Error('Selection Context has not been initialized')
}

const SelectionContext = createContext({
    workflow: {},
    setWorkflow: defaultFn,
    period: {},
    setPeriod: defaultFn,
    orgUnit: {},
    setOrgUnit: defaultFn,
})

export { SelectionContext }
