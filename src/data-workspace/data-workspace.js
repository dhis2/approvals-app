import React from 'react'
import { useWorkflowContext } from '../workflow-context/index.js'
import { TitleBar } from './title-bar.js'

const DataWorkspace = () => {
    const workflow = useWorkflowContext()

    return (
        <>
            <TitleBar
                name={workflow.displayName}
                dataSetsCount={workflow.dataSets.length}
                approvalState={workflow.approvalStatus.state}
            />
        </>
    )
}

export { DataWorkspace }
