import { useDataEngine } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { createContext, useContext, useRef } from 'react'

const defaultFn = () => {
    throw new Error('Approval Status Context has not been initialized')
}

const ApprovalStatusContext = createContext({
    registerNodeLabel: defaultFn,
})

const useApprovalStatusContext = () => useContext(ApprovalStatusContext)

const ApprovalStatusContextProvider = ({ children, periodId, workflowId }) => {
    const engine = useDataEngine()
    const registeredNodesRef = useRef(new Map())
    const getApprovalStatuses = async orgUnitIds => {
        try {
            const { approvalStatuses } = await engine.query({
                approvalStatuses: {
                    resource: 'dataApprovals/approvals',
                    params: {
                        pe: periodId,
                        wf: workflowId,
                        ou: orgUnitIds.join(),
                    },
                },
            })
            approvalStatuses.forEach(({ ou, state }) => {
                const setIcon = registeredNodesRef.current.get(ou)
            })
        } catch (error) {
            console.log('ERROR', error)
        }
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
