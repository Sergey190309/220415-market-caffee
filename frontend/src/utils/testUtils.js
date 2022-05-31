/* eslint-disable react/prop-types */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  combineReducers,
  // createStore
} from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'
import { runSaga } from 'redux-saga'

import { render } from '@testing-library/react'

// import alerts from '../redux/reducers/alert'
// import device from '../redux/reducers/device'
// import logIn from '../redux/reducers/auth'
// import lng from '../redux/reducers/lng'

import rootReducer from '../redux/slices'
// import reducer from './redux/slices';
// ===================================================
// The block about rendering connected components.
// ---------------------------------------------------
const connectedRender = (
  ui,
  { initialState, store = configureStore(rootReducer, initialState), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

const linkedRender = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

const connectedLinkedRender = (
  ui,
  { initialState, store = configureStore(rootReducer, initialState), ...renderOptions } = {}
) => {
  // const state = store.getState().auth
  // console.log('connectedLinkedRender, state ->', state)
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// const linkedRender = (ui) => {}

export * from '@testing-library/react'
export { connectedRender, linkedRender, connectedLinkedRender }
// ===================================================

// ===================================================
// Saga action recoder.
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

// ===================================================
/**
 * Return store based on live reducers from slicers
 */
// export const createTestStore = () => {
//   const store = configureStore(combineReducers({ ...rootReducer }))
//   return store
// }
// ===================================================
/**
 * It's from https://www.codeblocq.com/2021/01/Jest-Mock-Local-Storage/
 */
export const fakeLocalStorage =  () => {
  let store = {}

  return {
    getItem: key => {
      return store[key] || null
    },
    // getItem: function (key) {
    //   return store[key] || null;
    // },
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: key => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
}