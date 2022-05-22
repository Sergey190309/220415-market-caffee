import { mockV4Value } from 'uuid'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
// import configureStore from 'redux-mock-store'
import { takeEvery } from 'redux-saga/effects'

import { rejectData404, resolveTechInGet } from '../../constants/tests/testAxiosConstants'

import reducer, {
  // techInSuccess, startLngs
  startInitLoading,
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  startI18n
} from '../slices'
import { techInCall } from '../../api/calls/getAuthTechInfo'

import { recordSaga } from '../../utils/testUtils'

// import {techTextAxiosClient as mockTechTextAxiosClient} from '../../api/apiClient'

// import { startInitSaga } from './tech'

import {
  i18nSaga,
  i18nWorker,
  lngsSaga,
  lngsWorker,
  startInitSaga, startInitWorker, techInFetch, techInSaga
} from './tech'

import { initI18next } from '../../l10n/i18n'
import { sagaErrorHandler } from '../../utils/errorHandler'


jest.mock('uuid')
jest.mock('../../l10n/i18n', () => ({
  initI18next: jest.fn()
}))
jest.mock('redux-saga/effects', () => ({
  // __esModule: true,
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))
jest.mock('../../api/calls/getAuthTechInfo', () => ({
  techInCall: jest.fn(),
}))
jest.mock('../../utils/errorHandler', () => ({
  sagaErrorHandler: jest.fn()
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
    jest.unmock('../../utils/errorHandler')
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
      sagaMiddleware.run(techInSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        startTechIn.type, techInFetch)
    })
    test('lngSaga', async () => {
      sagaMiddleware.run(lngsSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        startLngs.type, lngsWorker)
    })
    test('i18nSaga', () => {
      sagaMiddleware.run(i18nSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(startI18n.type, i18nWorker)
    })
  })
  describe('saga workers', () => {
    const initialAction = {
      payload: mockV4Value
    }
    test('startInitWorker', async () => {
      const dispatched = await recordSaga(startInitWorker)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0].type).toBe(startTechIn.type)
      expect(dispatched[0].payload).toBe(mockV4Value)
      expect(initI18next).toHaveBeenCalledTimes(1)
    })
    test('techInFetch, success', async () => {
      // techInCall.mockResolvedValue(resolveTechInGet)
      techInCall.mockImplementation(
        () => Promise.resolve(resolveTechInGet))
      const dispatched = await recordSaga(techInFetch, initialAction)
      expect(techInCall).toHaveBeenCalledTimes(1)
      expect(techInCall).toHaveBeenCalledWith({
        tech_id: initialAction.payload
      })
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual({
        type: techInSuccess.type,
        payload: resolveTechInGet.data.payload
      })
    })
    test('techInFetch, fail', async () => {
      techInCall.mockImplementation(
        () => Promise.reject(rejectData404))
      const dispatched = await recordSaga(techInFetch, initialAction)
      expect(sagaErrorHandler).toHaveBeenCalledTimes(1)
      expect(sagaErrorHandler).toHaveBeenCalledWith(rejectData404)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual({
        type: techInFail.type,
        payload: undefined
      })
      // console.log('dispatched ->', dispatched)
    })
  })
})