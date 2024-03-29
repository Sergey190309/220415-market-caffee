import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { takeEvery } from 'redux-saga/effects'

import reducer, {
  logInStart, logInSuccess, logInFail, logInModalClosed,
  logOut,
  signUpStart, signUpSuccess, signUpFail, signUpModalClosed,
  confirmPasswordStart, confirmPasswordSuccess,
  confirmPasswordFail, confirmPasswordModalClosed
} from '../slices/auth'

import {
  logInSaga,
  logInFetch,
  signUpSaga,
  signUpFetch,
  confirmPasswordFetch,
  confirmPasswordSaga,
} from './auth'
import {
  logInCall, signUpCall
} from '../../api/calls/getAuthTechInfo'
import { recordSaga } from '../../utils/testUtils'
import {
  mockLogInData, mockUserData,
  mockSignUpResolveData, mockSignUpData
} from '../../constants/tests/testAxiosConstants'
import { startAlert } from '../slices'
import { sagaErrorHandler } from '../../utils/errorHandler'
jest.mock('redux-saga/effects', () => ({
  ...jest.requireActual('redux-saga/effects'),
  takeEvery: jest.fn()
}))
jest.mock('../../api/calls/getAuthTechInfo', () => ({
  logInCall: jest.fn(),
  signUpCall: jest.fn()
}))
jest.mock('../../utils/errorHandler', () => ({
  ...jest.requireActual('../../utils/errorHandler'),
  sagaErrorHandler: jest.fn()
}))
describe('Auth sagas testing', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => {
    jest.unmock('redux-saga/effects')
    jest.unmock('../../api/calls/getAuthTechInfo')
    jest.unmock('../../utils/errorHandler')
  })
  describe('Saga wathcers tesing', () => {
    let sagaMiddleware
    beforeEach(() => {
      const initialState = {}
      sagaMiddleware = createSagaMiddleware()
      const middleware = getDefaultMiddleware => [
        ...getDefaultMiddleware({ thunk: false }),
        sagaMiddleware
      ]
      configureStore({ reducer, middleware, initialState })
    })
    test('logInSaga', () => {
      sagaMiddleware.run(logInSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        logInStart.type, logInFetch)
    })
    test('signUpSaga', () => {
      sagaMiddleware.run(signUpSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        signUpStart.type, signUpFetch)
    })
    test('confirmPasswordSaga', () => {
      sagaMiddleware.run(confirmPasswordSaga)
      expect(takeEvery).toHaveBeenCalledTimes(1)
      expect(takeEvery).toHaveBeenCalledWith(
        confirmPasswordStart.type, confirmPasswordFetch)
    })
  })
  describe('Saga workers tesing', () => {
    test('logInFetch, success', async () => {
      logInCall.mockImplementation(() => Promise.resolve({ data: mockUserData }))
      const initialAction = {
        payload: mockLogInData
      }
      const dispatched = await recordSaga(
        logInFetch, initialAction)
      expect(logInCall).toHaveBeenCalledTimes(1)
      expect(logInCall).toHaveBeenCalledWith(
        initialAction.payload)
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual({
        type: logInSuccess.type, payload: mockUserData.payload
      })
      // console.log('dispatched ->', dispatched)
      expect(dispatched[1]).toEqual({
        type: startAlert.type,
        payload: {
          message: mockUserData.message,
          alertType: 'success',
          timeout: 3000,
          id: 'mock v4 value'
        }
      })
    })
    test('logInFetch, fail', async () => {
      const mockRejectMessage = {
        response: 'mockResponse',
        name: 'mockErrorName',
        message: 'mockErrorMessage'
      }
      // const mockErrorMessage = 'mockErrorMessage'
      logInCall.mockImplementation(() => Promise.reject(mockRejectMessage))
      // actRespErrorMessage.mockImplementation(() => mockErrorMessage)
      const initialAction = {
        payload: mockLogInData
      }
      const dispatched = await recordSaga(
        logInFetch, initialAction)
      expect(sagaErrorHandler).toHaveBeenCalledTimes(1)
      expect(sagaErrorHandler)
        .toHaveBeenCalledWith(mockRejectMessage)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual({
        type: logInFail.type, payload: undefined
      })
      // console.log('dispatched ->', dispatched)
    })
    test('signUpFetch, success', async () => {
      signUpCall.mockImplementation(() => Promise.resolve({ data: mockSignUpResolveData }))
      const initialAction = {
        payload: mockSignUpData
      }
      const dispatched = await recordSaga(
        signUpFetch, initialAction)
      expect(signUpCall).toHaveBeenCalledTimes(1)
      expect(signUpCall).toHaveBeenCalledWith(
        initialAction.payload)
      expect(dispatched).toHaveLength(2)
      expect(dispatched[0]).toEqual({
        type: signUpSuccess.type,
        payload: mockSignUpResolveData.payload
      })
      expect(dispatched[1]).toEqual({
        type: startAlert.type,
        payload: {
          message: mockSignUpResolveData.message,
          alertType: 'success',
          timeout: 3000,
          id: 'mock v4 value'
        }
      })
    })
    test('signUpFetch, fail', async () => {
      const mockRejectMessage = {
        response: 'mockResponse',
        name: 'mockErrorName',
        message: 'mockErrorMessage'
      }
      // const mockErrorMessage = 'mockErrorMessage'
      signUpCall.mockImplementation(() => Promise.reject(mockRejectMessage))
      // actRespErrorMessage.mockImplementation(() => mockErrorMessage)
      const initialAction = {
        payload: mockLogInData
      }
      const dispatched = await recordSaga(
        signUpFetch, initialAction)
      // console.log('dispatched ->', dispatched)
      expect(sagaErrorHandler).toHaveBeenCalledTimes(1)
      expect(sagaErrorHandler)
        .toHaveBeenCalledWith(mockRejectMessage)
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual({
        type: signUpFail.type, payload: undefined
      })
    })
  })
})
