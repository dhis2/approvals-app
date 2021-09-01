import { IconBlock16, IconError16 } from '@dhis2/ui'
import moment from 'moment'
import { getApprovalStatusDisplayData } from './get-approval-status.js'
import { Approved, Ready, Waiting } from './icons.js'

jest.mock('moment', () => {
    return () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
})

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
    describe('approved approval statuses "APPROVED_HERE" and "APPROVED_ABOVE"', () => {
        for (const approvalStatus of ['APPROVED_HERE', 'APPROVED_ABOVE']) {
            it(`returns the correct diplay data for ${approvalStatus} when only approvalStatus is supplied`, () => {
                expect(
                    getApprovalStatusDisplayData({ approvalStatus })
                ).toEqual({
                    displayName: 'Approved',
                    icon: Approved,
                    type: 'positive',
                })
            })
            it(`returns the correct diplay data for ${approvalStatus} when approvalStatus and approvedBy are passed`, () => {
                expect(
                    getApprovalStatusDisplayData({
                        approvalStatus,
                        approvedBy: 'Hendrik',
                    })
                ).toEqual({
                    displayName: 'Approved by Hendrik',
                    icon: Approved,
                    type: 'positive',
                })
            })
            it(`returns the correct diplay data for ${approvalStatus} when approvalStatus and approvalDateTime are passed`, () => {
                expect(
                    getApprovalStatusDisplayData({
                        approvalStatus,
                        approvalDateTime: '2020-08-24T18:55:03.165Z',
                    })
                ).toEqual({
                    displayName: 'Approved 2 years ago',
                    icon: Approved,
                    type: 'positive',
                })
            })
            it(`returns the correct diplay data for ${approvalStatus} when only all options are passed`, () => {
                expect(
                    getApprovalStatusDisplayData({
                        approvalStatus,
                        approvedBy: 'Hendrik',
                        approvalDateTime: '2020-08-24T18:55:03.165Z',
                    })
                ).toEqual({
                    displayName: 'Approved by Hendrik 2 years ago',
                    icon: Approved,
                    type: 'positive',
                })
            })
        }
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
