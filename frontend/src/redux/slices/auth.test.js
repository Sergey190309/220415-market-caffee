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
  signUpFail,signUpModalOpen, signUpModalClose,
  logInStart, logInSuccess,
  logInFail,logInModalOpen, logInModalClose,
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

const loggedInfo = {
  user_name: 'mockName',
  email: 'mockEmail',
  isAdmin: false,
  access_token: 'mockAccessToken',
  refresh_token: 'mockRefreshToken',
  isLoggedIn: true
}
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
        JSON.stringify(loggedInfo))
      const result = logInInfo()
      expect(result).toEqual(loggedInfo)
      expect(setAxiosAuthAccessToken)
        .toHaveBeenCalledTimes(1)
      expect(setAxiosAuthAccessToken)
        .toHaveBeenCalledWith(loggedInfo.access_token)
      expect(setAxiosAuthRefreshToken)
        .toHaveBeenCalledTimes(1)
      expect(setAxiosAuthRefreshToken)
        .toHaveBeenCalledWith(loggedInfo.refresh_token)
      // console.log('result ->', result)
    })
  })
  describe('Slices themselves', () => {
    let store
    beforeAll(() => {
      Object.defineProperty(window, localStorage, {
        value: fakeLocalStorage
      })
    })
    beforeEach(() => {
      // jest.resetAllMocks()
      setAxiosAuthAccessToken.mockReset()
      setAxiosAuthRefreshToken.mockReset()
      store = configureStore({
        reducer, middleware, initialState
      })
    })
    test('signUpStart', () => {
      // jest.resetAllMocks()
      const expState = {
        ...notLoggedInfo,
        isConfirmedPassword: false,
        loading: true,
        isSignedUp: false,
        isLoggedIn: false,
        isLogInOpened: false,
        isSignUpOpened: false
      }
      store.dispatch(setState({
        loading: false,
        isSignedUp: true,
        isLoggedIn: true
      }))
      store.dispatch(signUpStart())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('signUpSuccess', () => {
      // jest.resetAllMocks()
      const expState = {
        ...notLoggedInfo,
        isConfirmedPassword: false,
        loading: false,
        isSignedUp: true,
        isLoggedIn: false,
        isLogInOpened: false,
        isSignUpOpened: false      }
      store.dispatch(setState({
        loading: true,
        isSignedUp: true,
        isLoggedIn: true
      }))
      store.dispatch(signUpSuccess())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('signUpFail', () => {
      const expState = {
        ...initialState(),
        loading: false,
        isSignedUp: false,
        isLoggedIn: false,
        isLogInOpened: false,
        isSignUpOpened: false
      }
      store.dispatch(setState({
        loading: true,
        isSignedUp: true,
        isLoggedIn: true
      }))
      store.dispatch(signUpFail())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('signUpModalOpen', () => {
      const expState = {
        ...initialState(),
        isSignUpOpened: true,
      }
      store.dispatch(setState({
        isSignUpOpened: false,
      }))
      store.dispatch(signUpModalOpen())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('signUpModalClose', () => {
      const expState = {
        ...initialState(),
        isSignUpOpened: false,
      }
      store.dispatch(setState({
        isSignUpOpened: true,
      }))
      store.dispatch(signUpModalClose())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('logInStart', () => {
      const expState = {
        ...initialState(),
        loading: true,
        isSignedUp: false,
        isLoggedIn: false,
        isLogInOpened: false,
        isSignUpOpened: false      }
      store.dispatch(setState({
        loading: false,
        isSignedUp: true,
        isLoggedIn: true
      }))
      store.dispatch(logInStart())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('logInSuccess', () => {
      const expState = {
        ...loggedInfo,
        loading: false,
        isLoggedIn: true,
        isSignedUp: false,
        isConfirmedPassword: false,
        isLogInOpened: false,
        isSignUpOpened: false      }
      store.dispatch(setState({
        loading: true,
        isLoggedIn: false
      }))
      store.dispatch(logInSuccess(loggedInfo))
      const state = store.getState().auth
      expect(state).toEqual(expState)
      expect(JSON.parse(window.localStorage
        .getItem(LOG_IN_INFO))).toEqual(loggedInfo)
    })
    test('logInFail', () => {
      const expState = {
        ...notLoggedInfo,
        isConfirmedPassword: false,
        loading: false,
        isSignedUp: false,
        isLoggedIn: false,
        isLogInOpened: false,
        isSignUpOpened: false      }
      store.dispatch(setState({
        ...loggedInfo,
        loading: true,
        isSignedUp: true,
        isLoggedIn: true
      }))
      // const payload = loggedInfo
      store.dispatch(logInFail())
      const state = store.getState().auth
      expect(state).toEqual(expState)
      expect(window.localStorage.getItem(LOG_IN_INFO))
        .toBeNull()
      // console.log('localStorage ->',
      //   window.localStorage.getItem(LOG_IN_INFO))
    })
    test('logInModalOpen', () => {
      const expState = {
        ...initialState(),
        isLogInOpened: true,
      }
      store.dispatch(setState({
        isLogInOpened: false,
      }))
      store.dispatch(logInModalOpen())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('logInModalClose', () => {
      const expState = {
        ...initialState(),
        isLogInOpened: false,
      }
      store.dispatch(setState({
        isLogInOpened: true,
      }))
      store.dispatch(logInModalClose())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('logOut', () => {
      window.localStorage.setItem(LOG_IN_INFO,
        JSON.stringify(loggedInfo))
      const expState = {
        ...notLoggedInfo,
        isConfirmedPassword: false,
        loading: false,
        isSignedUp: false,
        isLoggedIn: false,
        isLogInOpened: false,
        isSignUpOpened: false
      }
      store.dispatch(setState({
        ...loggedInfo,
        loading: true,
        isSignedUp: true,
        isLoggedIn: true
      }))
      // const payload = loggedInfo
      store.dispatch(logOut())
      const state = store.getState().auth
      expect(state).toEqual(expState)
      expect(window.localStorage.getItem(LOG_IN_INFO))
        .toBeNull()
    })
    test('confirmPasswordStart', () => {
      const expState = {
        ...initialState(),
        loading: true,
        isConfirmedPassword: false,
        isLogInOpened: false,
        isSignUpOpened: false
      }
      store.dispatch(setState({
        loading: false,
        isConfirmedPassword: true,
      }))
      store.dispatch(confirmPasswordStart())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
    test('confirmPasswordSuccess', () => {
      window.localStorage.setItem(LOG_IN_INFO, JSON.stringify(loggedInfo))
      const expState = {
        ...loggedInfo,
        access_token: 'mockNewAccessToken',
        loading: false,
        isLoggedIn: true,
        isSignedUp: false,
        isConfirmedPassword: true,
        isLogInOpened: false,
        isSignUpOpened: false
       }
      store.dispatch(setState({
        ...loggedInfo,
        loading: true,
        isConfirmedPassword: false,
      }))
      store.dispatch(confirmPasswordSuccess(
        expState.access_token))
      const state = store.getState().auth
      expect(state).toEqual(expState)
      expect(JSON.parse(window.localStorage
        .getItem(LOG_IN_INFO)))
        .toEqual({
          ...loggedInfo,
          access_token: expState.access_token
        })
    })
    test('confirmPasswordFail', () => {
      const expState = {
        ...notLoggedInfo,
        isConfirmedPassword: false,
        loading: false,
        isSignedUp: false,
        isLoggedIn: false,
        isLogInOpened: false,
        isSignUpOpened: false
      }
      store.dispatch(setState({
        ...loggedInfo,
        loading: true,
        isSignedUp: true,
        isLoggedIn: true,
      }))
      // const payload = loggedInfo
      store.dispatch(confirmPasswordFail())
      const state = store.getState().auth
      expect(state).toEqual(expState)
      expect(window.localStorage.getItem(LOG_IN_INFO))
        .toBeNull()
    })
    test('confirmPasswordModalClosed', () => {
      const expState = {
        ...initialState(),
        isConfirmedPassword: false,
      }
      store.dispatch(setState({
        isConfirmedPassword: true,
      }))
      store.dispatch(confirmPasswordModalClosed())
      const state = store.getState().auth
      expect(state).toEqual(expState)
    })
})
})