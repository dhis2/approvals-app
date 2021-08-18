import React, { useState } from 'react'
import { useSelectionContext } from '../selection-context/index.js'
import { DataSetNavigation } from './data-set-navigation/index.js'
import { Display } from './display/index.js'
import { TitleBar } from './title-bar/index.js'

const DataWorkspace = () => {
    const { workflow } = useSelectionContext()
    const [selectedDataSet, setSelectedDataSet] = useState(
        workflow.dataSets.length === 1 ? workflow.dataSets[0].id : null
    )

    return (
        <>
            <TitleBar />
            <DataSetNavigation
                dataSets={workflow?.dataSets}
                selected={selectedDataSet}
                onChange={setSelectedDataSet}
            />
            <Display dataSetId={selectedDataSet} />
        </>
    )
}

export { DataWorkspace }
