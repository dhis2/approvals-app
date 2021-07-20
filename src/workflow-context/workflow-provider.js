import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import React, { useEffect } from 'react'
import { ErrorMessage, Loader } from '../shared/index.js'
import { useSelectedWorkflow } from './use-selected-workflow.js'
import { useSelectionParams } from './use-selection-params.js'
import { WorkflowContext } from './workflow-context.js'

const query = {
    approvalStatus: {
        resource: 'dataApprovals',
        params: ({ wf, pe, ou }) => ({ wf, pe, ou }),
    },
}

const WorkflowProvider = ({ children }) => {
    const params = useSelectionParams()
    const { displayName, dataSets } = useSelectedWorkflow(params)
    const { loading, error, data, called, refetch } = useDataQuery(query, {
        lazy: true,
    })

    useEffect(() => {
        if (params) {
            refetch(params)
        }
    }, [params])

    if (!params || !called) {
        return null
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return (
            <ErrorMessage title={i18n.t('Could not load approval data')}>
                {error.message}
            </ErrorMessage>
        )
    }

    const { state: approvalState, ...allowedActions } = data.approvalStatus

    return (
        <WorkflowContext.Provider
            value={{
                displayName,
                dataSets,
                approvalState,
                allowedActions,
                params,
                refresh: refetch,
            }}
        >
            {children}
        </WorkflowContext.Provider>
    )
}

WorkflowProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { WorkflowProvider }
