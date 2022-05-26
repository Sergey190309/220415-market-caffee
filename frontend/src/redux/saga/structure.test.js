import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'

import
  reducer, {
    structureStart, structureSuccess,
    structureFail, structureResetChanged
  } from '../slices/structure'

import { structureSaga, structureWorker } from './structure'

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))

describe('Structure saga testing', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('redux-saga/effects')
  })
  describe('Saga watchers', () => {
    let sagaMiddleware
    beforeEach(() => {
      const initialState = {}
      sagaMiddleware = createSagaMiddleware()
      const middleware = getDefaultMiddleware => [
        ...getDefaultMiddleware({ thunk: false }),
        sagaMiddleware
      ]
      configureStore({
        reducer,
        middleware,
        initialState
      })
    })
    test('structureStart', () => {
      sagaMiddleware.run(structureSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1);
      expect(takeEvery).toHaveBeenCalledWith(
        structureStart.type, structureWorker);
    })
  })
  describe('Saga workers', () => {
    test('structureWorker, success', () => {
      console.log('not finished')
    })
  })
})