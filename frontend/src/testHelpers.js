import React from 'react'

import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

// import store from './redux/store'

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

export const makeTestStore = store => {
  /**
   * The function mock store dispatch to spy it.
   */
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}
