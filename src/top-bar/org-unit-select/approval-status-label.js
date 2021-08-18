import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelectionContext } from '../../selection-context/index.js'
import { StatusIcon } from '../../shared/approval-state/index.js'
import classes from './approval-status-label.module.css'
import { useApprovalStatus } from './approval-statuses.js'

const ApprovalStatusLabel = ({ label, orgUnitId }) => {
    const { workflow, period } = useSelectionContext()
    const { getApprovalStatus, fetchApprovalStatus } = useApprovalStatus()
    const approvalStatus = getApprovalStatus({
        workflowId: workflow.id,
        periodId: period.id,
        orgUnitId,
    })

    useEffect(() => {
        fetchApprovalStatus({
            workflowId: workflow.id,
            periodId: period.id,
            orgUnitId,
        })
    }, [])

    if (approvalStatus === 'LOADING') {
        return label
    } else if (approvalStatus === 'FETCH_ERROR') {
        return label
    } else if (approvalStatus) {
        return (
            <div className={classes.container}>
                <StatusIcon approvalState={approvalStatus} />
                {label}
            </div>
        )
    }
    return label
}

ApprovalStatusLabel.propTypes = {
    label: PropTypes.string.isRequired,
    orgUnitId: PropTypes.string.isRequired,
}

export { ApprovalStatusLabel }
