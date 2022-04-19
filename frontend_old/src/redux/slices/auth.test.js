// import { logInCall } from '../../api/calls/getAuthTechInfo'
import {
// logInData as mockLogInData,
// resolveData as mockResolveData,
// logInSuccessArgs as mockLogInSuccessArgs
// rejectData as mockRejectData,
} from '../../testAxiosConstants'
import { LOG_IN_INFO } from '../constants/localStorageVariables'

import store from '../store'
import {
  setState,
  notLoggedInfo,
  // initialState,
  logInFail,
  logInStart,
  logInSuccess,
  signUpFail,
  signUpStart,
  signUpSuccess,
  logOut,
  confirmPasswordStart,
  confirmPasswordSuccess,
  confirmPasswordFail,
  confirmPasswordModalClosed
} from './auth'

jest.mock('../../api/apiClient')
jest.mock('../../api/calls/getAuthTechInfo')

describe('Auth slicer testing', () => {
  const emptyState = {
    ...notLoggedInfo,
    isLoggedIn: false,
    loading: false,
    isSignedUp: false,
    isConfirmedPassword: false
  }
  const logInPayload = {
    user_name: 'useName',
    email: 'eMail',
    isAdmin: false,
    access_token: 'mockAccessToken',
    refresh_token: 'mockRefreshToken'
  }
  const logInState = {
    ...logInPayload,
    isLoggedIn: true,
    loading: false,
    isSignedUp: false,
    isConfirmedPassword: false
  }
  beforeAll(() => {
    localStorage.clear()
    jest.resetAllMocks()
  })

  describe('logIn group', () => {
    // let state;
    // beforeEach(() => {});
    test('generation initialState', () => {
      const state = store.getState().auth
      const expState = { ...emptyState }
      expect(state).toEqual(expState)
      // console.log('auth slice, state ->', state);
    })
    test('creating logged in state', () => {
      store.dispatch(setState(logInState))
      const state = store.getState().auth
      const expState = { ...logInState }
      expect(state).toEqual(expState)
      // console.log('auth slice, state ->', state);
    })
    test('logInStart', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: false,
          isSignedUp: true,
          isLoggedIn: true
        })
      )
      store.dispatch(logInStart())
      const state = store.getState().auth
      const expState = {
        ...emptyState,
        loading: true,
        isSignedUp: false,
        isLoggedIn: false
      }
      expect(state).toEqual(expState)
      // console.log('auth slice, state ->', state);
    })
    test('logInSuccess', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: true,
          isSignedUp: false,
          isLoggedIn: false
        })
      )
      store.dispatch(logInSuccess(logInPayload))
      const state = store.getState().auth
      const expState = { ...logInState }
      expect(state).toEqual(expState)
      const { loading, isSignedUp, isLoggedIn, isConfirmedPassword, ...localyStored } = state
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        LOG_IN_INFO,
        JSON.stringify(localyStored)
      )
      // console.log('auth slice, state ->', state);
    })
    test('logInFail', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: true,
          isSignedUp: false,
          isLoggedIn: false
        })
      )
      store.dispatch(logInFail())
      const state = store.getState().auth
      const expState = { ...emptyState }
      expect(state).toEqual(expState)
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO)
      // console.log('auth slice, state ->', state);
    })
    test('logOut', () => {
      store.dispatch(setState(logInState))
      store.dispatch(logOut())
      const state = store.getState().auth
      const expState = { ...emptyState }
      expect(state).toEqual(expState)
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO)
      // console.log('auth slice, state ->', state);
    })
  })
  describe('SignUp group', () => {
    test('signUpStart', () => {
      store.dispatch(
        setState({
          ...emptyState,
          loading: false,
          isSignedUp: true,
          isLoggedIn: true
        })
      )
      store.dispatch(signUpStart())
      const state = store.getState().auth
      const expState = {
        ...emptyState,
        loading: true,
        isSignedUp: false,
        isLoggedIn: false
      }
      expect(state).toEqual(expState)
      // console.log('auth slice, state ->', state);
    })
    test('signUpSuccess', () => {
      store.dispatch(setState(logInState))
      store.dispatch(signUpSuccess())
      const state = store.getState().auth
      const expState = {
        ...emptyState,
        loading: false,
        isSignedUp: true,
        isLoggedIn: false
      }
      expect(state).toEqual(expState)
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO)
      // console.log('auth slice, state ->', state);
    })
    test('signUpFail', () => {
      store.dispatch(setState(logInState))
      store.dispatch(signUpFail())
      const state = store.getState().auth
      const expState = {
        ...emptyState,
        loading: false,
        isSignedUp: false,
        isLoggedIn: false
      }
      expect(state).toEqual(expState)
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOG_IN_INFO)
      // console.log('auth slice, state ->', state);
    })
  })
  describe('confirmPassword group', () => {
    test('confirmPasswordStart', () => {
      store.dispatch(setState({
        ...logInState,
        loading: false,
        isConfirmedPassword: true
      }))

      store.dispatch(confirmPasswordStart({ password: 'mockPassword' }))

      const state = store.getState().auth
      // console.log('slice, auth, test, state after ->', state)
      const expState = {
        ...logInState,
        loading: true,
        isConfirmedPassword: false
      }
      expect(state).toEqual(expState)
    })
    test('confirmPasswordSuccess', () => {
      const mockAccessToken = 'mockNewAccessToken'
      store.dispatch(setState({
        ...logInState,
        loading: true,
        isConfirmedPassword: false
      }))
      store.dispatch(confirmPasswordSuccess(mockAccessToken))
      const state = store.getState().auth
      const expState = {
        ...logInState,
        access_token: mockAccessToken,
        loading: false,
        isConfirmedPassword: true
      }
      expect(state).toEqual(expState)
      expect(localStorage.getItem).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem).toHaveBeenCalledWith(LOG_IN_INFO)
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith(LOG_IN_INFO, JSON.stringify({ access_token: mockAccessToken }))
    })
    test('confirmPasswordFail', () => {
      store.dispatch(setState({
        ...logInState,
        loading: true,
        isConfirmedPassword: false
      }))
      store.dispatch(confirmPasswordFail())
      const state = store.getState().auth
      const expState = {
        ...logInState,
        loading: false,
        isConfirmedPassword: false
      }
      expect(state).toEqual(expState)
    })
    test('confirmPasswordModalClosed', () => {
      store.dispatch(setState({
        ...logInState,
        // loading: true,
        isConfirmedPassword: true
      }))
      store.dispatch(confirmPasswordModalClosed())
      const state = store.getState().auth
      const expState = {
        ...logInState,
        // loading: false,
        isConfirmedPassword: false
      }
      expect(state).toEqual(expState)
    })
  })
})
