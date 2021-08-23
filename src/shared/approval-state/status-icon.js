import { colors } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { getApprovalStateDisplayData } from './get-approval-state.js'
import classes from './status-icon.module.css'

const getIconColorForType = type => {
    switch (type) {
        case 'default':
            return colors.grey500
        case 'neutral':
            return colors.blue700
        case 'positive':
            return colors.green600
        case 'negative':
            return colors.red600
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

StatusIcon.defaultProps = {
    showTitle: true,
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
