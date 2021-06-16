import { shallow } from 'enzyme'
import React from 'react'
import { App } from './app'

describe('<App>', () => {
    it('renders without errors', () => {
        shallow(<App />)
    })
})
