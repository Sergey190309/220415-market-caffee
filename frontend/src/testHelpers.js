import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

// import store from './redux/store'

export const elementFunc = (info = {}) => {
  /**
   * That's dump function for testing.
   */
  console.log('UpperLevelElementTypesMenu:\n simpleElementFunc',
    '\n  info ->', info)
}

export const testRender = (jsx, { store, ...otherOpts }) => {
  /**
   * The function wrap react component with react-redux provider.
   */
  return render(
    <Provider store={store}>
      {jsx}
    </Provider>,
    otherOpts
  )
}

export const testLinkedRender = (jsx, { ...otherProps } = {}) => {
  /**
   * The funciton return react component wrapped with
   * react-router-dom BrowserRouter
   */
  return render(
    <BrowserRouter>
      {jsx}
    </BrowserRouter>,
    otherProps
  )
}

export const makeTestStore = store => {
  /**
   * The function mock store dispatch to spy it.
   */
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}
