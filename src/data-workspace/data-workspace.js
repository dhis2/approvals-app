import React from 'react'
import { useCurrentUser } from '../current-user/index.js'
import { useQueryParams } from '../navigation/index.js'
import { TitleBar } from './title-bar.js'

const DataWorkspace = () => {
    const { dataApprovalWorkflows } = useCurrentUser()
    const { wf: workflowId } = useQueryParams()
    const selectedWorkflow =
        workflowId && dataApprovalWorkflows.find(w => w.id === workflowId)

    if (!selectedWorkflow) {
        return null
    }

    return (
        <>
            <TitleBar workflow={selectedWorkflow} />
            <pre>{JSON.stringify(selectedWorkflow, null, 4)}</pre>
        </>
    )
}

export { DataWorkspace }
