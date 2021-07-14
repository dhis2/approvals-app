import React, { useState } from 'react'
import { useWorkflowContext } from '../workflow-context/index.js'
import { useSelectionParams } from '../workflow-context/use-selection-params.js'
import { DataSetNavigation } from './data-set-navigation/index.js'
import { Display } from './display/index.js'
import { TitleBar } from './title-bar/index.js'

const DataWorkspace = () => {
    const { pe: periodId, ou: organisationUnitId } = useSelectionParams()
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
            <Display
                workflowName={workflow.displayName}
                dataSetId={selectedDataSet}
                periodId={periodId}
                organisationUnitId={organisationUnitId}
            />
        </>
    )
}

export { DataWorkspace }
