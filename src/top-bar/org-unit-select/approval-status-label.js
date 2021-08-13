import PropTypes from 'prop-types'
import React from 'react'
import { useSelectionContext } from '../../selection-context/index.js'
import { getApprovalStateDisplayData } from '../../shared/approval-state/index.js'
import classes from './approval-status-label.module.css'
import { useApprovalStatuses } from './approval-statuses.js'

const ApprovalStatusLabel = ({ label, orgUnitId }) => {
    const { workflow, period } = useSelectionContext()
    const { getApprovalStatus } = useApprovalStatuses()
    const approvalStatus = getApprovalStatus({
        workflowId: workflow.id,
        periodId: period.id,
        orgUnitId,
    })

    if (approvalStatus) {
        const { displayName, icon: Icon } =
            getApprovalStateDisplayData(approvalStatus)
        return (
            <div className={classes.container}>
                <span title={displayName} className={classes.iconContainer}>
                    <Icon />
                </span>
                {label}
            </div>
        )
    }
    return label
}

ApprovalStatusLabel.propTypes = {
    orgUnitId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export { ApprovalStatusLabel }
