import { useState, useEffect } from 'react'
import { history } from './history.js'
import { readQueryParams } from './read-query-params.js'

export const useQueryParams = () => {
    const [params, setParams] = useState(readQueryParams)

    useEffect(
        () =>
            // The call to listen returns an `unlisten` function to clean up the effect
            history.listen(() => {
                setParams(readQueryParams())
            }),
        []
    )

    return params
}
