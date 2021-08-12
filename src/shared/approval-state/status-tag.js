import { Tag } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { getApprovalStateDisplayData } from './get-approval-state.js'

const StatusTag = ({ approvalState }) => {
    const {
        icon: Icon,
        displayName,
        type,
    } = getApprovalStateDisplayData(approvalState)
    const props = {
        [type]: true,
        icon: <Icon />,
    }

    return <Tag {...props}>{displayName}</Tag>
}

StatusTag.propTypes = {
    approvalState: PropTypes.oneOf([
        'APPROVED_HERE',
        'APPROVED_ABOVE',
        'ACCEPTED_HERE',
        'UNAPPROVED_READY',
        'UNAPPROVED_WAITING',
        'UNAPPROVED_ABOVE',
        'UNAPPROVABLE',
    ]),
}

export { StatusTag }
