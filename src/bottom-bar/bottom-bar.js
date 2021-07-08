import React from 'react'
import { StatusTag } from '../shared/index.js'
import { useWorkflowContext } from '../workflow-context/index.js'

const BottomBar = () => {
    const { approvalState } = useWorkflowContext()

    return (
        <>
            <StatusTag approvalState={approvalState} />
        </>
    )
}

export { BottomBar }
