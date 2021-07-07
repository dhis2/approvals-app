import React, { useState } from 'react'
import { useWorkflowContext } from '../workflow-context/index.js'
import { Navigation } from './navigation.js'
import { TitleBar } from './title-bar.js'
import { Display } from './display.js'

const DataWorkspace = () => {
    const workflow = useWorkflowContext()
    const [selectedDataSet, setSelectedDataSet] = useState(
        workflow.dataSets.length === 1 ? workflow.dataSets[0].id : null
    )

    return (
        <>
            <TitleBar
                name={workflow.displayName}
                dataSetsCount={workflow.dataSets.length}
                approvalState={workflow.approvalStatus.state}
            />
            <Navigation
                dataSets={workflow.dataSets}
                selected={selectedDataSet}
                onChange={setSelectedDataSet}
            />
            <Display
                workflowName={workflow.displayName}
                dataSetId={selectedDataSet}
            />
        </>
    )
}

export { DataWorkspace }
