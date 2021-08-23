import { useDataQuery } from '@dhis2/app-runtime'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

const query = {
    organisationUnits: {
        resource: 'organisationUnits',
        params: ({ filterQuery }) => ({
            fields: ['path'],
            filter: `identifiable:token:${filterQuery}`,
        }),
    },
}

const useFilter = ({ selectedOrgUnitPath }) => {
    const [filteredPaths, setFilteredPaths] = useState([])
    const [filterQuery, setFilterQuery] = useState('')
    const { refetch } = useDataQuery(query, {
        onComplete: data => {
            setFilteredPaths(data.organisationUnits.organisationUnits.map(ou => ou.path))
        },
        onError: () => {
            // TODO
        },
        lazy: true,
    })

    const [debouncedFilterQuery] = useDebounce(filterQuery, 300)
    useEffect(() => {
        if (debouncedFilterQuery !== '') {
            refetch({ filterQuery: debouncedFilterQuery })
        }
    }, [debouncedFilterQuery])

    return {
        filteredPaths: debouncedFilterQuery === ''
            ? []
            : [...filteredPaths, selectedOrgUnitPath],
        filterQuery,
        setFilterQuery,
    }
}

export { useFilter }
