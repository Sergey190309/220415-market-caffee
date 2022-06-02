import React from 'react'
import { Provider } from 'react-redux'

import TestRenderer from 'react-test-renderer'
// import { render, screen } from '@testing-library/react'

import store from '../redux/store'

import App from './App'

describe('App', () => {
  test('Snapshot', () => {
    // const something = TestRenderer
    const element = TestRenderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(element).toMatchSnapshot()
  })
})
