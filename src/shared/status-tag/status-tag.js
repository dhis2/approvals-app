import { Tag } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { getTagDisplayData } from './get-tag-display-data.js'

const StatusTag = ({ approvalState }) => {
    const { icon: Icon, displayName, type } = getTagDisplayData(approvalState)
    const props = {
        [type]: true,
        icon: <Icon />,
    }

    return <Tag {...props}>{displayName}</Tag>
}

StatusTag.propTypes = {
    approvalState: PropTypes.oneOf([
        'APPROVED_HERE',
        'APPROVED_ELSEWHERE',
        'ACCEPTED_HERE',
        'ACCEPTED_ELSEWHERE',
        'UNAPPROVED_READY',
        'UNAPPROVED_WAITING',
        'UNAPPROVED_ELSEWHERE',
        'UNAPPROVED_ABOVE',
        'UNAPPROVABLE',
    ]),
}

export { StatusTag }
