import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import reducer from './'
import {
  initialState,
  setTestStructureState,
  structureStart
} from './structure'

const sagaMiddleware = createSagaMiddleware()
const middleware = (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

describe('structure slices testing', () => {
  let store
  beforeEach(() => {
    jest.resetAllMocks()
    store = configureStore({ reducer, middleware, initialState })
  })
  test('structureStart', () => {
    const expState = {
      ...initialState,
      loading: true,
      loaded: false
    }
    store.dispatch(setTestStructureState({
      loading: false,
      loaded: true
    }))
    const state = store.getState().structure
    console.log('expState ->', expState,
    '\nstate ->', state)
  });
});