import i18n from '@dhis2/d2-i18n'
import { IconWarning16, colors } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useSelectionContext } from '../../selection-context/index.js'
import { ApprovalStatusIcon } from '../../shared/approval-status/index.js'
import classes from './approval-status-label.module.css'
import { useApprovalStatus } from './approval-statuses.js'

const renderIcon = approvalStatus => {
    if (approvalStatus === 'LOADING') {
        return <span className={classes.loadingIcon}></span>
    } else if (approvalStatus === 'FETCH_ERROR') {
        return (
            <span
                title={i18n.t('Failed to load approval state')}
                className={classes.iconContainer}
            >
                <IconWarning16 color={colors.yellow500} />
            </span>
        )
    } else if (approvalStatus) {
        return <ApprovalStatusIcon approvalStatus={approvalStatus} />
    }
}

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

    return (
        <div className={classes.container}>
            {renderIcon(approvalStatus)}
            {label}
        </div>
    )
}

ApprovalStatusLabel.propTypes = {
    label: PropTypes.string.isRequired,
    orgUnitId: PropTypes.string.isRequired,
}

export { ApprovalStatusLabel }
