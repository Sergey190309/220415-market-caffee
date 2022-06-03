import { mockV4Value } from 'uuid'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
// import configureStore from 'redux-mock-store'
import { takeEvery } from 'redux-saga/effects'

import { rejectData404, resolveTechInFetch, resolveLngsCall } from '../../constants/tests/testAxiosConstants'

import reducer, {
  startInitLoading, initLoadingSuccess,
  startTechIn, techInSuccess, techInFail,
  startLngs, lngsSuccess, lngsFail,
  startI18n, i18nSuccess, i18nFail
} from '../slices/tech'
import { lngsCall, techInCall } from '../../api/calls/getAuthTechInfo'

import { recordSaga } from '../../utils/testUtils'

// import {techTextAxiosClient as mockTechTextAxiosClient} from '../../api/apiClient'

// import { startInitSaga } from './tech'

import {
  startInitSaga, startInitWorker,
  techInSaga, techInFetch,
  i18nSaga, i18nWorker,
  lngsSaga, lngsWorker,
} from './tech'

import { initI18next, setI18next } from '../../l10n/i18n'
import { sagaErrorHandler } from '../../utils/errorHandler'
import { structureStart } from '../slices'


jest.mock('uuid')
jest.mock('../../l10n/i18n', () => ({
  initI18next: jest.fn(),
  setI18next: jest.fn()
}))
jest.mock('redux-saga/effects', () => ({
  // __esModule: true,
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))
jest.mock('../../api/calls/getAuthTechInfo', () => ({
  techInCall: jest.fn(),
  lngsCall: jest.fn()
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
    test('startInitSaga', () => {
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
    test('lngSaga', () => {
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
    const lngs = ['en', 'ru']
    test('startInitWorker', async () => {
      const dispatched = await recordSaga(startInitWorker)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0].type).toBe(startTechIn.type)
      expect(dispatched[0].payload).toBe(mockV4Value)
      expect(initI18next).toHaveBeenCalledTimes(1)
    })
    test('techInFetch, success', async () => {
      // techInCall.mockResolvedValue(resolveTechInFetch)
      techInCall.mockImplementation(
        () => Promise.resolve(resolveTechInFetch))
      const dispatched = await recordSaga(
        techInFetch, initialAction)
      expect(techInCall).toHaveBeenCalledTimes(1)
      expect(techInCall).toHaveBeenCalledWith({
        tech_id: initialAction.payload
      })
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual({
        type: techInSuccess.type,
        payload: resolveTechInFetch.data.payload
      })
      expect(dispatched[1]).toEqual({
        type: startLngs.type,
        payload: undefined
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
    test('lngsWorker, success', async () => {
      lngsCall.mockImplementation(
        () => Promise.resolve(resolveLngsCall))
      const expLngs = lngs
      const dispatched = await recordSaga(lngsWorker)
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual({
        type: lngsSuccess.type, payload: undefined
      })
      expect(dispatched[1]).toEqual({
        type: startI18n.type, payload: expLngs
      })
    })
    test('lngsWorker, fail', async () => {
      lngsCall.mockImplementation(
        () => Promise.reject(rejectData404))
      const dispatched = await recordSaga(lngsWorker)
      expect(sagaErrorHandler).toHaveBeenCalledTimes(1)
      expect(sagaErrorHandler).toHaveBeenCalledWith(rejectData404)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual({
        type: lngsFail.type, payload: undefined
      })

    })
    test('i18nWorker, success', async () => {
      const action = {
        type: startI18n.type,
        payload: lngs
      }
      const dispatched = await recordSaga(i18nWorker, action)
      expect(setI18next).toHaveBeenCalledTimes(1)
      expect(setI18next).toHaveBeenCalledWith(action.payload)
      // console.log('dispatched ->', dispatched)
      expect(dispatched).toHaveLength(3)
      expect(dispatched[0]).toEqual({
        type: i18nSuccess.type, payload: undefined
      })
      expect(dispatched[1]).toEqual({
        type: initLoadingSuccess.type, payload: undefined
      })
      expect(dispatched[2]).toEqual({
        type: structureStart.type, payload: undefined
      })
    })
    test('i18nWorker, fail', async () => {
      setI18next.mockImplementation(
        () => { throw new Error() }
      )
      const action = {
        type: startI18n.type,
        payload: lngs
      }
      const dispatched = await recordSaga(i18nWorker, action)
      expect(sagaErrorHandler).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: i18nFail.type,
        payload: undefined
      });
      // console.log('dispatched ->', dispatched)
    })
  })
})