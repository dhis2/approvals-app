import { Tag } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { getApprovalStatusDisplayData } from './get-approval-status.js'

const ApprovalStatusTag = ({ approvalStatus }) => {
    const {
        icon: Icon,
        displayName,
        type,
    } = getApprovalStatusDisplayData(approvalStatus)
    const props = {
        [type]: true,
        icon: <Icon />,
    }

    return <Tag {...props}>{displayName}</Tag>
}

ApprovalStatusTag.propTypes = {
    approvalStatus: PropTypes.oneOf([
        'APPROVED_HERE',
        'APPROVED_ABOVE',
        'ACCEPTED_HERE',
        'UNAPPROVED_READY',
        'UNAPPROVED_WAITING',
        'UNAPPROVED_ABOVE',
        'UNAPPROVABLE',
    ]),
}

export { ApprovalStatusTag }
