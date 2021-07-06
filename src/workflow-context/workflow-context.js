import { createContext } from 'react'

const WorkflowContext = createContext({
    displayName: '',
    dataSets: [],
    status: {},
})

export { WorkflowContext }
