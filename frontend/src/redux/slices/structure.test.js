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
      ...initialState,
      loading: false,
      loaded: true
    }))
    store.dispatch(structureStart())
    const state = store.getState().structure
    expect(state).toEqual(expState);
    console.log('expState ->', expState,
    '\nstate ->', state)
  });
});