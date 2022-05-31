import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'

import reducer from '../slices/alerts'
import {
  alertSaga,
  alertWorker
} from './alerts'
import { startAlert, removeAlert } from '../slices'

import { recordSaga } from '../../utils/testUtils'
import { delaySomthing } from '../../utils/utils'

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))
jest.mock('../../utils/utils', () => ({
  delaySomthing: jest.fn()
}))

describe('Alerts saga testing', () => {
  afterAll(() => {
    jest.unmock('redux-saga/effects')
  })
  describe('Watcher', () => {
    let sagaMiddleware
    beforeEach(() => {
      jest.resetAllMocks()
      const initialState = {}
      sagaMiddleware = createSagaMiddleware()
      const middleware = getDefaultMiddleware => [
        ...getDefaultMiddleware({ thunk: false }),
        sagaMiddleware
      ]
      configureStore({ reducer, middleware, initialState })
    })
    test('alertSaga', () => {
      sagaMiddleware.run(alertSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        startAlert.type, alertWorker)
    })
  })
  describe('Worker', () => {
    test('alertWorker', async () => {
      const initialAction = {
        payload: {
          timeout: 1000,
          id: 'messageMockId'
        }
      }
      const dispatched = await recordSaga(alertWorker, initialAction)
      expect(delaySomthing).toHaveBeenCalledTimes(1)
      expect(delaySomthing).toHaveBeenCalledWith(
        initialAction.payload.timeout)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual({
        type: removeAlert.type,
        payload: initialAction.payload.id
      })
      // console.log('dispatched ->', dispatched)
    })
  })
})