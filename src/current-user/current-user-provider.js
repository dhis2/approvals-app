import { useDataQuery } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import React from 'react'
import { CurrentUserContext } from './current-user-context.js'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: [
                'id',
                'authorities',
                'programs',
                'dataSets',
                'userGroups',
                'organisationUnits',
                'dataViewOrganisationUnits',
            ],
        },
    },
    dataApprovalWorkflows: {
        // This is generic enpoint but will only return
        // workflows a user is allowed to see
        resource: 'dataApprovalWorkflows',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'dataApprovalLevels', 'periodType'],
        },
    },
}

const CurrentUserProvider = ({ children }) => {
    const { data, loading, error } = useDataQuery(query)

    if (loading) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
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
        <CurrentUserContext.Provider value={providerValue}>
            {children}
        </CurrentUserContext.Provider>
    )
}

CurrentUserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { CurrentUserProvider }
