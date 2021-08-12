import i18n from '@dhis2/d2-i18n'
import { IconBlock16, IconError16 } from '@dhis2/ui'
import { Approved, Ready, Waiting } from './icons.js'

const getApprovalStateIcon = approvalState => {
    switch (approvalState) {
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
            throw new Error(`Unknown approval state: '${approvalState}'`)
    }
}

const getApprovalStateText = approvalState => {
    switch (approvalState) {
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
            return i18n.t('Approved')
        case 'UNAPPROVABLE':
            return i18n.t('Cannot be approved')
        case 'ERROR':
            return i18n.t('Could not retrieve approval status')
        default:
            throw new Error(`Unknown approval state: '${approvalState}'`)
    }
}

const getTagDisplayData = approvalState => {
    const displayName = getApprovalStateText(approvalState)
    const { icon, type } = getApprovalStateIcon(approvalState)

    return { displayName, icon, type }
}

export { getTagDisplayData, getApprovalStateIcon }
