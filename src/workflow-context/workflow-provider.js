import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import React, { useEffect } from 'react'
import { useSelectionContext } from '../selection-context/index.js'
import { ErrorMessage, Loader } from '../shared/index.js'
import { WorkflowContext } from './workflow-context.js'

const query = {
    approvalStatus: {
        resource: 'dataApprovals',
        params: ({ workflow, period, orgUnit }) => ({
            wf: workflow.id,
            pe: period.id,
            ou: orgUnit.id,
        }),
    },
}

const WorkflowProvider = ({ children }) => {
    const { workflow, period, orgUnit } = useSelectionContext()
    const { loading, error, data, called, refetch } = useDataQuery(query, {
        lazy: true,
    })

    useEffect(() => {
        if (workflow && period && orgUnit) {
            refetch({ workflow, period, orgUnit })
        }
    }, [workflow, period, orgUnit])

    if (!workflow || !period || !orgUnit) {
        return null
    }

    if (loading || !called) {
        return <Loader />
    }

    if (error) {
        return (
            <ErrorMessage title={i18n.t('Could not load approval data')}>
                {error.message}
            </ErrorMessage>
        )
    }

    const { state: approvalStatus, ...allowedActions } = data.approvalStatus

    return (
        <WorkflowContext.Provider
            value={{
                approvalStatus,
                allowedActions,
                refresh: refetch,
                params: {
                    wf: workflow.id,
                    pe: period.id,
                    ou: orgUnit.id,
                },
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
