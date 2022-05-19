import { mockV4Value } from 'uuid'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
// import configureStore from 'redux-mock-store'
import { takeEvery } from 'redux-saga/effects'

import reducer, {
  // techInSuccess, startLngs
  startInitLoading,
  startTechIn
} from '../slices'
import { techInCall } from '../../api/calls/getAuthTechInfo'

import { recordSaga } from '../../utils/testUtils'

// import {techTextAxiosClient as mockTechTextAxiosClient} from '../../api/apiClient'

// import { startInitSaga } from './tech'

import {
  startInitSaga, startInitWorker, techInFetch, techInSaga
} from './tech'

import { initI18next } from '../../l10n/i18n'


jest.mock('uuid')
jest.mock('../../l10n/i18n', () => ({
  initI18next: jest.fn()
}))
jest.mock('redux-saga/effects', () => ({
  __esModule: true,
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))
jest.mock('../../api/calls/getAuthTechInfo', () => ({
  techInCall: jest.fn()
}))

describe('Tech saga testing', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('uuid')
    jest.unmock('../../l10n/i18n')
    jest.unmock('redux-saga/effects')
    jest.unmock('../../api/calls/getAuthTechInfo')
  })
  describe('saga watchers', () => {
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
    test('startInitSaga', async () => {
      sagaMiddleware.run(startInitSaga)
      // sagaMiddleware.run(rootSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        startInitLoading.type, startInitWorker)
    })
    test('techInSaga', () => {
      expect(true).toBe(true)
      sagaMiddleware.run(techInSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        startTechIn.type, techInFetch)
      // console.log('techInSaga, takeEvery ->',
      //   takeEvery.mock.calls)
    })
  })
  describe('saga workers', () => {
    test('startInitWorker', async () => {
      const dispatched = await recordSaga(startInitWorker)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0].type).toBe(startTechIn.type)
      expect(dispatched[0].payload).toBe(mockV4Value)
      expect(initI18next).toHaveBeenCalledTimes(1)
    })
    test('techInFetch', async () => {
      const initialAction = {
        payload: mockV4Value
      }
      techInCall.mockImplementation(() => 'hi')
      // techInCall.mockReturnValue('hi')
      const dispatched = await recordSaga(techInFetch, initialAction)

      console.log('techInCall ->', techInCall.mock.calls)
      console.log('dispatched ->', dispatched)
    })
  })
})