import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { StatusIcon } from '../../shared/approval-state/index.js'
import classes from './approval-status-icons-legend.module.css'

// Not all approval statuses are defined here as some share the same icons
const statuses = [
    {
        status: 'UNAPPROVED_WAITING',
        displayName: i18n.t('Waiting for approval'),
    },
    { status: 'UNAPPROVED_READY', displayName: i18n.t('Ready for approval') },
    { status: 'APPROVED_HERE', displayName: i18n.t('Approved') },
    { status: 'UNAPPROVABLE', displayName: i18n.t('Cannot be approved') },
]

const ApprovalStatusIconsLegend = () => (
    <div className={classes.container}>
        {statuses.map(({ status, displayName }) => (
            <div key={status} className={classes.label}>
                <StatusIcon approvalState={status} showTitle={false} />
                {displayName}
            </div>
        ))}
    </div>
)

export { ApprovalStatusIconsLegend }
