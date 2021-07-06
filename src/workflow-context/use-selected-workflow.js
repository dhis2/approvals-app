import { useAppData } from '../app-data/index.js'

const useSelectedWorkflow = params => {
    const { dataApprovalWorkflows } = useAppData()

    if (!(params && params.wf && dataApprovalWorkflows)) {
        return {}
    }

    return dataApprovalWorkflows.find(({ id }) => id === params.wf) || {}
}

export { useSelectedWorkflow }
