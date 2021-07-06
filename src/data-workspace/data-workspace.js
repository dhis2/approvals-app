import React from 'react'
import { useWorkflowContext } from '../workflow-context/index.js'
import { TitleBar } from './title-bar.js'

const DataWorkspace = () => {
    const workflow = useWorkflowContext()

    return (
        <>
            <TitleBar workflow={workflow} />
        </>
    )
}

export { DataWorkspace }
