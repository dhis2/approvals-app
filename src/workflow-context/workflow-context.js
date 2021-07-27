import { createContext } from 'react'

const WorkflowContext = createContext({
    approvalState: '',
    allowedActions: {},
    refresh: () => {
        throw new Error('WorkflowContext.refresh has not been initialized')
    },
})

export { WorkflowContext }
