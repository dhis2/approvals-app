import i18n from '@dhis2/d2-i18n'
import { Tag, Tooltip } from '@dhis2/ui'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import {
    getApprovalStatusDisplayData,
    isApproved,
} from './get-approval-status.js'

const ApprovalStatusTag = ({ approvalStatus, approvedAt, approvedBy }) => {
    const {
        icon: Icon,
        displayName,
        type,
    } = getApprovalStatusDisplayData({ approvalStatus, approvedAt, approvedBy })
    const props = {
        [type]: true,
        icon: <Icon />,
    }
    const shouldRenderTooltip = isApproved(approvalStatus) && approvedAt
    const tag = <Tag {...props}>{displayName}</Tag>

    if (!shouldRenderTooltip) {
        return tag
    }

    const dateTimeStr = moment(approvedAt).format('LLL')
    const tooltipContent = i18n.t('Approved {{- dateTimeStr}}', { dateTimeStr })

    return <Tooltip content={tooltipContent}>{tag}</Tooltip>
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
    approvedAt: PropTypes.string,
    approvedBy: PropTypes.string,
}

export { ApprovalStatusTag }
