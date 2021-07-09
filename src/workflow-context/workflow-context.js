import { createContext } from 'react'

const WorkflowContext = createContext({
    displayName: '',
    dataSets: [],
    approvalState: '',
    allowedActions: {},
    params: {},
    refresh: () => {
        throw new Error('WorkflowContext.refresh has not been initialized')
    },
})

export { WorkflowContext }
