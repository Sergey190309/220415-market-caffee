import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import createSagaMiddleware, { runSaga } from 'redux-saga'
import { all } from 'redux-saga/effects'

import reducer from '../redux/slices'
// import rootSaga from '../redux/saga'

// ===================================================
// Custom custom configure store
// ---------------------------------------------------
// const rootReducer = combineReducers(reducer)

export const setupStore = (preloadedState, saga = null) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = getDefaultMiddleware => [
    ...getDefaultMiddleware({ thunk: false }), sagaMiddleware
  ]
  const store = configureStore({
    reducer,
    middleware,
    preloadedState
  })

  function* rootSaga() {
    yield all([
      saga()
    ])
  }
  if (saga) {
    sagaMiddleware.run(rootSaga)
  }
  return store
}

// ===================================================
// Custom render function Provider
// ---------------------------------------------------
export const renderWithProviders = (
  // export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  // console.log('renderWithProviders, preloadedState ->', preloadedState,
  //   '\n  store.dispatch ->', store.dispatch)
  const Wrapper = ({ children }) => {
    return (
      <Router>
        <Provider store={store}>
          {children}
        </Provider>
      </Router>
    )
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// ===================================================
// Custom render function with Router and Provider
// ---------------------------------------------------
export const renderWithRouterAndProviders = (
  // export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  // console.log('renderWithProviders, preloadedState ->', preloadedState,
  //   '\n  store.dispatch ->', store.dispatch)
  const Wrapper = ({ children }) => {
    return (
      <Router>
        <Provider store={store}>
          {children}
        </Provider>
      </Router>
    )
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// ===================================================
// Saga action recoder
// ---------------------------------------------------

export const recordSaga = async (saga, initialAction) => {
  const dispatched = []
  // console.log(saga)

  await runSaga(
    {
      dispatch: action => dispatched.push(action)
    },
    saga,
    initialAction
  ).done

  return dispatched
}
