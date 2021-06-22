import { createContext } from 'react'

const noop = () => {}

const SelectionContext = createContext({
    workflow: {},
    setWorkflow: noop,
    period: {},
    setPeriod: noop,
    orgUnit: {},
    setOrgUnit: noop,
})

export { SelectionContext }
