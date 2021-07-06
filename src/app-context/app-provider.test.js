import { useDataQuery } from '@dhis2/app-runtime'
import { shallow, mount } from 'enzyme'
import React from 'react'
import { expectRenderError } from '../test-utils/expect-render-error.js'
import { AppProvider } from './app-provider.js'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<AppProvider>', () => {
    it('shows a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({ loading: true }))

        const wrapper = mount(<AppProvider>Child</AppProvider>)
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

        expectRenderError(<AppProvider {...props} />, message)
    })

    it('renders the children once data has been received', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                me: {},
            },
        }))

        const wrapper = shallow(<AppProvider>Child</AppProvider>)

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })
})
