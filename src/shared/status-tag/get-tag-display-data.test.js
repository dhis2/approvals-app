import { getTagDisplayData } from './get-tag-display-data.js'
import { Approved, Ready, Waiting } from './icons.js'

describe('getTagDisplayData', () => {
    it('returns "approved" display data for the correct approval states', () => {
        const expectedDisplayData = {
            icon: Approved,
            displayName: 'Approved',
            type: 'positive',
        }
        expect(getTagDisplayData('APPROVED_HERE')).toEqual(expectedDisplayData)
        expect(getTagDisplayData('APPROVED_ABOVE')).toEqual(expectedDisplayData)
    })
    it('returns "ready for approval and accepted" display data for the correct approval states', () => {
        const expectedDisplayData = {
            icon: Ready,
            displayName: 'Ready for approval and accepted',
            type: 'neutral',
        }
        expect(getTagDisplayData('ACCEPTED_HERE')).toEqual(expectedDisplayData)
    })
    it('returns "ready for approval" display data for the correct approval states', () => {
        const expectedDisplayData = {
            icon: Ready,
            displayName: 'Ready for approval',
            type: 'neutral',
        }
        expect(getTagDisplayData('UNAPPROVED_READY')).toEqual(
            expectedDisplayData
        )
    })
    it('returns "waiting" display data for the correct approval states', () => {
        const expectedDisplayData = {
            icon: Waiting,
            displayName: 'Waiting',
            type: 'default',
        }
        expect(getTagDisplayData('UNAPPROVED_WAITING')).toEqual(
            expectedDisplayData
        )
        expect(getTagDisplayData('UNAPPROVED_ABOVE')).toEqual(
            expectedDisplayData
        )
    })
    it('returns "cannot approve" display data for the correct approval states', () => {
        const expectedDisplayData = {
            icon: Waiting,
            displayName: 'Cannot approve',
            type: 'negative',
        }
        expect(getTagDisplayData('UNAPPROVABLE')).toEqual(expectedDisplayData)
    })
    it('throws an error when encountering an unknown approval state', () => {
        expect(() => getTagDisplayData('bad input')).toThrow(
            "Unknown approval state: 'bad input'"
        )
    })
})
