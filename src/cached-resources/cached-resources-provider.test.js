import { useDataQuery } from '@dhis2/app-runtime'
import { shallow, mount } from 'enzyme'
import React from 'react'
import { expectRenderError } from '../test-utils/expect-render-error.js'
import { CachedResourcesProvider } from './cached-resources-provider.js'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<AuthWall>', () => {
    it('shows a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({ loading: true }))

        const wrapper = mount(
            <CachedResourcesProvider>Child</CachedResourcesProvider>
        )
        const loadingIndicator = wrapper.find({
            'data-test': 'dhis2-uicore-circularloader',
        })

        expect(loadingIndicator).toHaveLength(1)
    })

    it('throws fetching errors if they occur', () => {
        const props = { children: 'Child' }
        const message = 'Something went wrong'
        const error = new Error(message)

        useDataQuery.mockImplementation(() => ({
            loading: false,
            error,
        }))

        expectRenderError(<CachedResourcesProvider {...props} />, message)
    })

    it('renders the children once data has been received', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                me: {},
                systemInfo: {
                    version: '2.37.0',
                },
            },
        }))

        const wrapper = shallow(
            <CachedResourcesProvider>Child</CachedResourcesProvider>
        )

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })
})
