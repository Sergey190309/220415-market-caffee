import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import reducer from './'
import {
  initialState,
  setTestStructureState,
  structureStart,
  structureSuccess,
  structureFail,
  structureResetChanged
} from './structure'

import { structuresArr } from '../../constants/tests/testConstants'

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
    expect(state).toEqual(expState)
    // console.log('expState ->', expState,
    //   '\nstate ->', state
    // )
  })
  test('structureSuccess', () => {
    const expState = { loading: false, loaded: true, changed: true }
    store.dispatch(structureSuccess(structuresArr))
    const state = store.getState().structure
    structuresArr.forEach(structure => Object.assign(expState, structure))
    expect(state).toEqual(expState)
  })
  test('structureFail', () => {
    store.dispatch(structureSuccess(structuresArr))
    store.dispatch(structureFail())
    const state = store.getState().structure
    expect(state).toEqual(initialState)
  })
  test('structureResetChanged', () => {
    store.dispatch(setTestStructureState({ ...initialState, changed: true }))
    store.dispatch(structureResetChanged())
    const state = store.getState().structure
    expect(state.changed).toBe(false)
  })
})