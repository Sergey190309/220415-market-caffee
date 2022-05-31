import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'

import
reducer, {
  structureStart, structureSuccess,
  structureFail, structureResetChanged
} from '../slices/structure'

import { getViewStructure } from '../../api/calls/getViewsStructure'
import '../../api/apiClient'

import { structureSaga, structureWorker } from './structure'

import { recordSaga } from '../../utils/testUtils'
import { sagaErrorHandler } from '../../utils/errorHandler'

import { rejectData404, resolveGetViewStructure } from '../../constants/tests/testAxiosConstants'
import { techTextAxiosClient } from '../../api/apiClient'

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))
jest.mock('../../api/apiClient', () => ({
  techTextAxiosClient: {
    defaults: {
      headers:
        { common: { Authorization: 'mockBearer' } }
    }
  }
}))
jest.mock('../../api/calls/getViewsStructure', () => ({
  getViewStructure: jest.fn()
}))
jest.mock('../../utils/errorHandler', () => ({
  sagaErrorHandler: jest.fn()
}))

describe('Structure saga testing', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('redux-saga/effects')
    jest.unmock('../../api/apiClient')
    jest.unmock('../../utils/errorHandler')
  })
  describe('Saga watcher', () => {
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
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        structureStart.type, structureWorker)
    })
  })
  describe('Saga workers', () => {
    test('structureWorker, success', async () => {
      getViewStructure.mockImplementation(() => Promise.resolve(resolveGetViewStructure))
      const expViewStructures = resolveGetViewStructure.data.payload.map(structure => ({
        [structure.view_id]: structure.attributes
      }))
      const dispatched = await recordSaga(structureWorker)
      expect(getViewStructure).toHaveBeenCalledTimes(1)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual({
        type: structureSuccess.type,
        payload: expViewStructures
      })
      // console.log('dispatched ->', dispatched)
      // console.log('resolveGetViewStructure ->', resolveGetViewStructure.data.payload)
      // console.log('expViewStructure ->', expViewStructures)
    })
    test('structureWorker, no authorization', async () => {
      techTextAxiosClient.defaults.headers.common.Authorization = undefined
      const dispatched = await recordSaga(structureWorker)
      expect(dispatched).toHaveLength(0)
      expect(getViewStructure.mock.calls).toHaveLength(0)
      techTextAxiosClient.defaults.headers.common.Authorization = 'mockBearer'
      // console.log('getViewStructure.mock.calls ->', getViewStructure.mock.calls)
      // console.log('dispatched ->', dispatched)
    })
    test('structureWorker, fail', async () => {
      getViewStructure.mockImplementation(() => Promise.reject(rejectData404))
      const dispatched = await recordSaga(structureWorker)
      expect(sagaErrorHandler).toHaveBeenCalledTimes(1);
      expect(sagaErrorHandler).toHaveBeenCalledWith(rejectData404);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({type: structureFail.type, payload: undefined});
      // console.log('dispatched ->', dispatched)

    })
  })
})