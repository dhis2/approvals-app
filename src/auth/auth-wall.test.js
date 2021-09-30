import { NoticeBox } from '@dhis2/ui'
import { shallow } from 'enzyme'
import React from 'react'
import { ErrorMessage } from '../shared/index.js'
import { AuthWall } from './auth-wall.js'
import { useIsAuthorized } from './use-is-authorized.js'

jest.mock('./use-is-authorized', () => ({
    useIsAuthorized: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<AuthWall>', () => {
    it('shows a noticebox for unauthorized users', () => {
        useIsAuthorized.mockImplementation(() => ({
            hasAppAccess: false,
            hasApprovalAuthorities: false,
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper.find(ErrorMessage)).toHaveLength(1)
        expect(wrapper.prop('children')).toBe(
            "You don't have access to the Data Approval App. Contact a system administrator to request access."
        )
    })

    it('shows a noticebox for users without appropriate authorities', () => {
        useIsAuthorized.mockImplementation(() => ({
            hasAppAccess: true,
            hasApprovalAuthorities: false,
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper.find(ErrorMessage)).toHaveLength(1)
        expect(wrapper.prop('children')).toBe(
            'You are not allowed to approve data. Contact a system administrator to request the appropriate authorities.'
        )
    })

    it('renders the children for authorised users', () => {
        useIsAuthorized.mockImplementation(() => ({
            hasAppAccess: true,
            hasApprovalAuthorities: true,
        }))

        const wrapper = shallow(<AuthWall>Child</AuthWall>)

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })
})
