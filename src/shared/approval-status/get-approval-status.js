import i18n from '@dhis2/d2-i18n'
import { IconBlock16, IconError16 } from '@dhis2/ui'
import moment from 'moment'
import { Approved, Ready, Waiting } from './icons.js'

const getApprovalStatusIcon = approvalStatus => {
    switch (approvalStatus) {
        case 'UNAPPROVED_READY':
        case 'ACCEPTED_HERE':
            return {
                icon: Ready,
                type: 'neutral',
            }
        case 'UNAPPROVED_WAITING':
        case 'UNAPPROVED_ABOVE':
            return {
                icon: Waiting,
                type: 'default',
            }
        case 'APPROVED_HERE':
        case 'APPROVED_ABOVE':
            return {
                icon: Approved,
                type: 'positive',
            }
        case 'UNAPPROVABLE':
            return {
                icon: IconBlock16,
                type: 'negative',
            }
        case 'ERROR':
            return {
                icon: IconError16,
                type: 'negative',
            }
        default:
            throw new Error(`Unknown approval status: '${approvalStatus}'`)
    }
}

const getApprovedStatusText = ({ approvalDateTime, approvedBy: name }) => {
    if (approvalDateTime) {
        const timeAgo = moment(approvalDateTime).fromNow()

        return name
            ? i18n.t('Approved by {{- name}} {{timeAgo}}', { name, timeAgo })
            : i18n.t('Approved {{timeAgo}}', { timeAgo })
    }

    return name
        ? i18n.t('Approved by {{- name}}', { name })
        : i18n.t('Approved')
}

const getApprovalStatusText = ({
    approvalStatus,
    approvalDateTime,
    approvedBy,
}) => {
    switch (approvalStatus) {
        case 'UNAPPROVED_READY':
            return i18n.t('Ready for approval')
        case 'ACCEPTED_HERE':
            return i18n.t('Ready for approval — Accepted')
        case 'UNAPPROVED_WAITING':
            return i18n.t('Waiting for lower level approval')
        case 'UNAPPROVED_ABOVE':
            return i18n.t('Waiting for higher level approval')
        case 'APPROVED_HERE':
        case 'APPROVED_ABOVE':
            return getApprovedStatusText({ approvalDateTime, approvedBy })
        case 'UNAPPROVABLE':
            return i18n.t('Cannot be approved')
        case 'ERROR':
            return i18n.t('Could not retrieve approval status')
        default:
            throw new Error(`Unknown approval status: '${approvalStatus}'`)
    }
}

const isApproved = approvalStatus =>
    approvalStatus === 'APPROVED_HERE' || approvalStatus === 'APPROVED_ABOVE'

const getApprovalStatusDisplayData = ({
    approvalStatus,
    approvalDateTime,
    approvedBy,
}) => {
    const displayName = getApprovalStatusText({
        approvalStatus,
        approvalDateTime,
        approvedBy,
    })
    const { icon, type } = getApprovalStatusIcon(approvalStatus)

    return { displayName, icon, type }
}

export { getApprovalStatusDisplayData, isApproved }
