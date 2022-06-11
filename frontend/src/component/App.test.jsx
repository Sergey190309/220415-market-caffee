import React from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { render } from '@testing-library/react'
// import { connectedRender } from '../utils/testUtils'

import store from '../redux/store'

import App from './App'


describe('App, no mocks', () => {
  describe('snapshot', () => {
    test('Snapshot', () => {
      // const { useDispatch } = jest.requireActual('react-redux')
      const { container } = render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
      expect(container).toMatchSnapshot()
    })
  })
})
