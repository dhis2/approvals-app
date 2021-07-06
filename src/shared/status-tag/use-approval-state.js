import i18n from '@dhis2/d2-i18n'
import { Approved, Ready, Waiting } from './icons.js'

/*
 * TODO: The current classification logic was discussed with
 * Joe Cooper, but needs to be confirmed by either Lars or Jim.
 * Specifically these cases are not clear:
 * A. Do ACCEPTED_HERE and ACCEPTED_ELSEWHERE fall into "Ready for
 *    approval and accepted"? This doesn't seem to match the webapi docs.
 * B. Should we show a red tag for UNAPPROVABLE and show a negative tag?
 *    This was not included in the design specs.
 */
const useApprovalState = approvalState => {
    switch (approvalState) {
        case 'APPROVED_HERE':
        case 'APPROVED_ELSEWHERE':
            return {
                icon: Approved,
                displayName: i18n.t('Approved'),
                type: 'positive',
            }

        case 'ACCEPTED_HERE':
        case 'ACCEPTED_ELSEWHERE':
            return {
                icon: Ready,
                displayName: i18n.t('Ready for approval and accepted'),
                type: 'neutral',
            }

        case 'UNAPPROVED_READY':
            return {
                icon: Ready,
                displayName: i18n.t('Ready for approval'),
                type: 'neutral',
            }

        case 'UNAPPROVED_WAITING':
        case 'UNAPPROVED_ELSEWHERE':
            return {
                icon: Waiting,
                displayName: i18n.t('Waiting'),
                type: 'default',
            }

        case 'UNAPPROVABLE':
            return {
                icon: Waiting,
                displayName: i18n.t('Cannot approve'),
                type: 'negative',
            }
    }
}

export { useApprovalState }
