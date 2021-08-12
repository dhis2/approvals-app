import { IconBlock16, IconError16 } from '@dhis2/ui'
import { getApprovalStateDisplayData } from './get-approval-state.js'
import { Approved, Ready, Waiting } from './icons.js'

describe('getApprovalStateDisplayData', () => {
    it('returns the correct display data for approval state "UNAPPROVED_READY"', () => {
        expect(getApprovalStateDisplayData('UNAPPROVED_READY')).toEqual({
            displayName: 'Ready for approval',
            icon: Ready,
            type: 'neutral',
        })
    })
    it('returns the correct display data for approval state "ACCEPTED_HERE"', () => {
        expect(getApprovalStateDisplayData('ACCEPTED_HERE')).toEqual({
            displayName: 'Ready for approval — Accepted',
            icon: Ready,
            type: 'neutral',
        })
    })
    it('returns the correct display data for approval state "UNAPPROVED_WAITING"', () => {
        expect(getApprovalStateDisplayData('UNAPPROVED_WAITING')).toEqual({
            displayName: 'Waiting for lower level approval',
            icon: Waiting,
            type: 'default',
        })
    })
    it('returns the correct display data for approval state "UNAPPROVED_ABOVE"', () => {
        expect(getApprovalStateDisplayData('UNAPPROVED_ABOVE')).toEqual({
            displayName: 'Waiting for higher level approval',
            icon: Waiting,
            type: 'default',
        })
    })
    it('returns the correct display data for approval state "APPROVED_HERE"', () => {
        expect(getApprovalStateDisplayData('APPROVED_HERE')).toEqual({
            displayName: 'Approved',
            icon: Approved,
            type: 'positive',
        })
    })
    it('returns the correct display data for approval state "APPROVED_ABOVE"', () => {
        expect(getApprovalStateDisplayData('APPROVED_ABOVE')).toEqual({
            displayName: 'Approved',
            icon: Approved,
            type: 'positive',
        })
    })
    it('returns the correct display data for approval state "UNAPPROVABLE"', () => {
        expect(getApprovalStateDisplayData('UNAPPROVABLE')).toEqual({
            displayName: 'Cannot be approved',
            icon: IconBlock16,
            type: 'negative',
        })
    })
    it('returns the correct display data for approval state "ERROR"', () => {
        expect(getApprovalStateDisplayData('ERROR')).toEqual({
            displayName: 'Could not retrieve approval status',
            icon: IconError16,
            type: 'negative',
        })
    })
    it('throws an error when encountering an unknown approval state', () => {
        expect(() => getApprovalStateDisplayData('bad input')).toThrow(
            "Unknown approval state: 'bad input'"
        )
    })
})
