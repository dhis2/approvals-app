import { useDataQuery } from '@dhis2/app-runtime'
import { shallow, mount } from 'enzyme'
import React from 'react'
import { expectRenderError } from '../test-utils/expect-render-error.js'
import { AppDataProvider } from './app-data-provider.js'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<AppDataProvider>', () => {
    it('shows a spinner when loading', () => {
        useDataQuery.mockImplementation(() => ({ loading: true }))

        const wrapper = mount(<AppDataProvider>Child</AppDataProvider>)
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

        expectRenderError(<AppDataProvider {...props} />, message)
    })

    it('renders the children once data has been received', () => {
        useDataQuery.mockImplementation(() => ({
            loading: false,
            error: undefined,
            data: {
                me: {},
            },
        }))

        const wrapper = shallow(<AppDataProvider>Child</AppDataProvider>)

        expect(wrapper.text()).toEqual(expect.stringContaining('Child'))
    })
})
