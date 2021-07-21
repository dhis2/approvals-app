import React, { useState } from 'react'
import { useWorkflowContext } from '../workflow-context/index.js'
import { DataSetNavigation } from './data-set-navigation/index.js'
import { Display } from './display/index.js'
import { TitleBar } from './title-bar/index.js'

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
                approvalState={workflow.approvalState}
            />
            <DataSetNavigation
                dataSets={workflow.dataSets}
                selected={selectedDataSet}
                onChange={setSelectedDataSet}
            />
            <Display dataSetId={selectedDataSet} />
        </>
    )
}

export { DataWorkspace }
