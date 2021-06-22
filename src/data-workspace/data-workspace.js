import React from 'react'
import { useQueryParams } from '../navigation/index.js'

const DataWorkspace = () => {
    const query = useQueryParams()

    return (
        <>
            <h1>Data workspace placeholder</h1>
            <pre>{JSON.stringify(query, null, 4)}</pre>
        </>
    )
}

export { DataWorkspace }
