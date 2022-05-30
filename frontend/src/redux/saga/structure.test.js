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

import { resolveGetViewStructure } from '../../constants/tests/testAxiosConstants'

jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))
jest.mock('../../api/apiClient', () => ({
  techTextAxiosClient: {
    defaults: {
      headers: { common: { Authorization: 'mockBearer' } }
    }
  }
}))
jest.mock('../../api/calls/getViewsStructure', () => ({
  getViewStructure: jest.fn()
}))

describe('Structure saga testing', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('redux-saga/effects')
    jest.unmock('../../api/apiClient')
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
      getViewStructure.mockImplementation(() => resolveGetViewStructure)
      const expViewStructures = resolveGetViewStructure.data.payload.map(structure => ({[structure.view_id]: structure.attributes}))
      const dispatched = await recordSaga(structureWorker)
      expect(getViewStructure).toHaveBeenCalledTimes(1)
      expect(dispatched).toHaveLength(1);

      console.log('dispatched ->', dispatched)

    })
  })
})