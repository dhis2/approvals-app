import { useDataQuery } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import React from 'react'
import { CurrentUserContext } from './current-user-context.js'

const meQuery = {
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
}

const dataApprovalWorkflowsQuery = {
    dataApprovalWorkflows: {
        resource: 'users',
        id: ({ id }) => `${id}/dataApprovalWorkflows`,
    },
}

const CurrentUserProvider = ({ children }) => {
    const {
        data: workflowsData,
        loading: workflowsLoading,
        error: workflowsError,
        refetch: refetchWorkflows,
        called: workflowsCalled,
    } = useDataQuery(dataApprovalWorkflowsQuery, {
        lazy: true,
    })
    const {
        data: meData,
        loading: meLoading,
        error: meError,
    } = useDataQuery(meQuery, {
        onComplete: ({ me: { id } }) => refetchWorkflows({ id }),
    })
    const loading = !workflowsCalled || workflowsLoading || meLoading
    const error = !loading && (workflowsError || meError)

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

    return (
        <CurrentUserContext.Provider
            value={{
                ...meData.me,
                ...workflowsData.dataApprovalWorkflows,
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}

CurrentUserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { CurrentUserProvider }
