import { IconBlock16, IconError16 } from '@dhis2/ui'
import { getApprovalStatusDisplayData } from './get-approval-status.js'
import { Approved, Ready, Waiting } from './icons.js'

describe('getApprovalStatusDisplayData', () => {
    it('returns the correct display data for approval status "UNAPPROVED_READY"', () => {
        expect(
            getApprovalStatusDisplayData({ approvalStatus: 'UNAPPROVED_READY' })
        ).toEqual({
            displayName: 'Ready for approval',
            icon: Ready,
            type: 'neutral',
        })
    })
    it('returns the correct display data for approval status "ACCEPTED_HERE"', () => {
        expect(
            getApprovalStatusDisplayData({ approvalStatus: 'ACCEPTED_HERE' })
        ).toEqual({
            displayName: 'Ready for approval — Accepted',
            icon: Ready,
            type: 'neutral',
        })
    })
    it('returns the correct display data for approval status "UNAPPROVED_WAITING"', () => {
        expect(
            getApprovalStatusDisplayData({
                approvalStatus: 'UNAPPROVED_WAITING',
            })
        ).toEqual({
            displayName: 'Waiting for lower level approval',
            icon: Waiting,
            type: 'default',
        })
    })
    it('returns the correct display data for approval status "UNAPPROVED_ABOVE"', () => {
        expect(
            getApprovalStatusDisplayData({ approvalStatus: 'UNAPPROVED_ABOVE' })
        ).toEqual({
            displayName: 'Waiting for higher level approval',
            icon: Waiting,
            type: 'default',
        })
    })
    it('returns the correct display data for approval status "APPROVED_HERE"', () => {
        expect(
            getApprovalStatusDisplayData({ approvalStatus: 'APPROVED_HERE' })
        ).toEqual({
            displayName: 'Approved',
            icon: Approved,
            type: 'positive',
        })
    })
    it('returns the correct display data for approval status "APPROVED_ABOVE"', () => {
        expect(
            getApprovalStatusDisplayData({ approvalStatus: 'APPROVED_ABOVE' })
        ).toEqual({
            displayName: 'Approved',
            icon: Approved,
            type: 'positive',
        })
    })
    it('returns the correct display data for approval status "UNAPPROVABLE"', () => {
        expect(
            getApprovalStatusDisplayData({ approvalStatus: 'UNAPPROVABLE' })
        ).toEqual({
            displayName: 'Cannot be approved',
            icon: IconBlock16,
            type: 'negative',
        })
    })
    it('returns the correct display data for approval status "ERROR"', () => {
        expect(
            getApprovalStatusDisplayData({ approvalStatus: 'ERROR' })
        ).toEqual({
            displayName: 'Could not retrieve approval status',
            icon: IconError16,
            type: 'negative',
        })
    })
    it('throws an error when encountering an unknown approval status', () => {
        expect(() =>
            getApprovalStatusDisplayData({ approvalStatus: 'bad input' })
        ).toThrow("Unknown approval status: 'bad input'")
    })
})
