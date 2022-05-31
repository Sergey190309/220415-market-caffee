import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import {
  setAxiosAuthAccessToken, setAxiosAuthRefreshToken
} from '../../api/apiClient'
import {
  LOG_IN_INFO
} from '../constants/localStorageVariables'
import reducer, {
  signUpStart, signUpSuccess,
  signUpFail, signUpModalClosed,
  logInStart, logInSuccess,
  logInFail, logInModalClosed,
  logOut,
  confirmPasswordStart, confirmPasswordSuccess,
  confirmPasswordFail, confirmPasswordModalClosed
} from './'
import { logInInfo, initialState, setState, notLoggedInfo } from './auth'
import { fakeLocalStorage } from '../../utils/testUtils'

jest.mock('../../api/apiClient', () => ({
  setAxiosAuthAccessToken: jest.fn(),
  setAxiosAuthRefreshToken: jest.fn()
}))

const sagaMiddleware = createSagaMiddleware()
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
describe('Auth slice testing', () => {
  afterAll(() => {
    jest.unmock('../../api/apiClient')
  })
  describe('Auxiliry functions', () => {
    beforeAll(() => {
      Object.defineProperty(window, localStorage, {
        value: fakeLocalStorage
      })
    })
    test('logInInfo, no auth token', () => {
      const result = logInInfo()
      expect(result).toEqual({
        ...notLoggedInfo, isLoggedIn: false
      })
      expect(setAxiosAuthAccessToken).toHaveBeenCalledTimes(0)
      expect(setAxiosAuthRefreshToken)
        .toHaveBeenCalledTimes(0)
      // console.log('result ->', result)
      // console.log('calls ->', setAxiosAuthAccessToken.mock.calls)
    })
    test('logInInfo, auth tocken', () => {
      window.localStorage.setItem(LOG_IN_INFO,
        JSON.stringify({
        user_name: 'mockName',
        email: 'mockEmail',
        isAdmin: false,
        access_token: 'mockAccessToken',
        refresh_token: 'mockRefreshToken'
        }))
      const result = logInInfo()
      console.log('result ->', result)
    })
  })
  describe('Slices themselves', () => {
    let store
    beforeEach(() => {
      jest.resetAllMocks()
      store = configureStore({
        reducer, middleware, initialState
      })
    })
    test('signUpStart', () => {
    })
  })
})