import { useDataQuery } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { createContext, useContext, useRef } from 'react'

const defaultFn = () => {
    throw new Error('Approval Status Context has not been initialized')
}

const ApprovalStatusContext = createContext({
    getApprovalStatuses: defaultFn,
    registerNodeLabel: defaultFn,
})

const useApprovalStatusContext = () => useContext(ApprovalStatusContext)

const query = {
    approvalStatuses: {
        resource: 'dataApprovals/approvals',
        params: ({ workflowId, periodId, orgUnitIds }) => ({
            pe: periodId,
            wf: workflowId,
            ou: orgUnitIds.join(),
        }),
    },
}

const ApprovalStatusContextProvider = ({ children, periodId, workflowId }) => {
    const registeredNodesRef = useRef(new Map())
    const { /*loading, data, error,*/ refetch } = useDataQuery(query, {
        lazy: true,
        onComplete: data => {
            console.log(
                'GET approvalStatuses - onComplete',
                data.approvalStatuses.length
            )
        },
        onError: error => {
            console.log('GET approvalStatuses - onError', error)
        },
    })
    const getApprovalStatuses = orgUnitIds => {
        refetch({ periodId, workflowId, orgUnitIds })
    }
    const registerNodeLabel = (id, setIcon) => {
        registeredNodesRef.current.set(id, { id, setIcon })
    }

    return (
        <ApprovalStatusContext.Provider value={registerNodeLabel}>
            {children({ getApprovalStatuses })}
        </ApprovalStatusContext.Provider>
    )
}

ApprovalStatusContextProvider.propTypes = {
    children: PropTypes.func.isRequired,
    periodId: PropTypes.string.isRequired,
    workflowId: PropTypes.string.isRequired,
}

export { useApprovalStatusContext, ApprovalStatusContextProvider }
