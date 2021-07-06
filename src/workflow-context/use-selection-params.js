import { useState, useEffect } from 'react'
import { history, readQueryParams } from '../navigation/index.js'

const getParamsIfAllAvailable = () => {
    const { wf, pe, ou: orgUnitPath } = readQueryParams()
    if (wf && pe && orgUnitPath) {
        const orgUnitPathSegments = orgUnitPath.split('/')
        const orgUnitId = orgUnitPathSegments[orgUnitPathSegments.length - 1]

        return {
            wf,
            pe,
            ou: orgUnitId,
        }
    }

    return null
}

export const useSelectionParams = () => {
    const [params, setParams] = useState(getParamsIfAllAvailable)

    useEffect(
        () =>
            // The call to listen returns an `unlisten` function to clean up the effect
            history.listen(() => {
                setParams(getParamsIfAllAvailable())
            }),
        []
    )

    return params
}
