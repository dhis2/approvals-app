import React from 'react'
import { StatusTag } from '../shared/index.js'
import { useWorkflowContext } from '../workflow-context/index.js'

const BottomBar = () => {
    const { approvalStatus } = useWorkflowContext()

    return (
        <>
            <StatusTag approvalState={approvalStatus.state} />
        </>
    )
}

export { BottomBar }
