import { useDataQuery } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import { Layer } from '@dhis2/ui'
import React from 'react'
import { Loader } from '../shared/index.js'
import { AppDataContext } from './app-data-context.js'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: ['id', 'authorities', 'organisationUnits'],
        },
    },
    dataApprovalWorkflows: {
        // This is generic enpoint but will only return
        // workflows a user is allowed to see
        resource: 'dataApprovalWorkflows',
        params: {
            paging: false,
            fields: [
                'id',
                'displayName',
                'dataApprovalLevels',
                'periodType',
                'dataSets[id,displayName]',
            ],
        },
    },
}

const AppDataProvider = ({ children }) => {
    const { data, loading, error } = useDataQuery(query)

    if (loading) {
        return (
            <Layer>
                <Loader />
            </Layer>
        )
    }

    if (error) {
        /**
         * The app can't continue if this fails, because it doesn't
         * have any data, so throw the error and let it be caught by
         * the error boundary in the app-shell
         */
        throw error
    }

    const providerValue = {
        ...data.me,
        ...data.dataApprovalWorkflows,
    }

    return (
        <AppDataContext.Provider value={providerValue}>
            {children}
        </AppDataContext.Provider>
    )
}

AppDataProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AppDataProvider }
