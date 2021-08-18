import { colors } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { getApprovalStateDisplayData } from './get-approval-state.js'
import classes from './status-icon.module.css'

const getIconColorForType = type => {
    switch (type) {
        case 'neutral':
            return colors.blue800
        case 'positive':
            return colors.green800
        case 'negative':
            return colors.red800
    }
}

const StatusIcon = ({ approvalState, showTitle }) => {
    const {
        icon: Icon,
        displayName,
        type,
    } = getApprovalStateDisplayData(approvalState)

    return (
        <span
            title={showTitle ? displayName : ''}
            className={classes.container}
        >
            <Icon color={getIconColorForType(type)} />
        </span>
    )
}

StatusIcon.propTypes = {
    approvalState: PropTypes.oneOf([
        'APPROVED_HERE',
        'APPROVED_ABOVE',
        'ACCEPTED_HERE',
        'UNAPPROVED_READY',
        'UNAPPROVED_WAITING',
        'UNAPPROVED_ABOVE',
        'UNAPPROVABLE',
    ]),
    showTitle: PropTypes.bool,
}

export { StatusIcon }
