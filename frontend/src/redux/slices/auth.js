import { createSlice } from '@reduxjs/toolkit'

import { setAxiosAuthAccessToken, setAxiosAuthRefreshToken } from '../../api/apiClient'
import { LOG_IN_INFO } from '../constants/localStorageVariables'

export const notLoggedInfo = {
  /**
   * Used for create and return to 'empty' set of state values
   */
  user_name: '',
  email: '',
  isAdmin: false,
  access_token: '',
  refresh_token: ''
}

export const logInInfo = () => {
  /**
   * Used to avoid undefined value if local ctorage does not contain
   * needed variables.
   * If localStorage contains appropriate personal tokens set axios
   * instances with authorisation.
   */
  const _localStorage = localStorage.getItem(LOG_IN_INFO)
    ? { ...JSON.parse(localStorage.getItem(LOG_IN_INFO)), isLoggedIn: true }
    : { ...notLoggedInfo, isLoggedIn: false }
  if (_localStorage.access_token.length > 0) {
    // console.log('auth slice, logInInfo, _localStorage.access_tokSen ->', _localStorage.access_token)
    setAxiosAuthAccessToken(_localStorage.access_token)
    setAxiosAuthRefreshToken(_localStorage.refresh_token)
  }
  return _localStorage
}

export const initialState = () => ({
  ...logInInfo(),
  loading: false,
  isSignedUp: false,
  isConfirmedPassword: false
})

const authSlice = createSlice({
  /**
   * I tested all reducers but signUpModalClosed and logInModalClosed.
   */
  name: 'auth',
  initialState: initialState(),
  reducers: {
    setState: (state, { payload }) => {
      // Object.keys(state).forEach(key => {
      //   delete state[key]
      // })
      Object.assign(state, payload)
    },
    signUpStart: state => {
      state.loading = true
      state.isSignedUp = false
      state.isLoggedIn = false
    },
    signUpSuccess: state => {
      localStorage.removeItem(LOG_IN_INFO)
      Object.assign(state, notLoggedInfo, {
        loading: false,
        isSignedUp: true,
        isLoggedIn: false
      })
    },
    signUpModalClosed: state => {
      state.isSignedUp = false
    },
    signUpFail: state => {
      localStorage.removeItem(LOG_IN_INFO)
      Object.assign(state, notLoggedInfo, {
        isSignedUp: false,
        isLoggedIn: false,
        loading: false
      })
    },
    logInStart: state => {
      state.loading = true
      state.isSignedUp = false
      state.isLoggedIn = false
    },
    logInSuccess: (state, { payload }) => {
      // console.log('authSlice, logInSuccess, payload ->', payload)
      setAxiosAuthAccessToken(payload.access_token)
      setAxiosAuthRefreshToken(payload.refresh_token)
      // setAxiosAuthToken({ access_token: payload.access_token, refresh_token: payload.refresh_token })
      localStorage.setItem(LOG_IN_INFO, JSON.stringify(payload))
      Object.assign(state, payload, { loading: false, isLoggedIn: true })
    },
    logInFail: state => {
      localStorage.removeItem(LOG_IN_INFO)
      Object.assign(state, notLoggedInfo, {
        loading: false,
        isSignedUp: false,
        isLoggedIn: false
      })
    },
    logInModalClosed: state => {
      state.isLoggedIn = false
    },
    logOut: state => {
      // console.log('authSlice, logOut')
      setAxiosAuthAccessToken('')
      setAxiosAuthRefreshToken('')
      localStorage.removeItem(LOG_IN_INFO)
      Object.assign(state, notLoggedInfo, {
        loading: false,
        isSignedUp: false,
        isLoggedIn: false
      })
    },
    confirmPasswordStart: state => {
      state.loading = true
      // state.isLoggedIn = true
      state.isConfirmedPassword = false
    },
    confirmPasswordSuccess: (state, { payload }) => {
      // console.log('slice, auth, confirmPasswordSuccess, payload ->', payload)
      const localStorageInfo = localStorage.getItem(LOG_IN_INFO)
        ? JSON.parse(localStorage.getItem(LOG_IN_INFO))
        : {}
      localStorageInfo.access_token = payload
      localStorage.setItem(LOG_IN_INFO, JSON.stringify(localStorageInfo))
      state.access_token = payload
      state.loading = false
      state.isConfirmedPassword = true
    },
    confirmPasswordFail: state => {
      state.loading = false
      state.isConfirmedPassword = false
    },
    confirmPasswordModalClosed: state => {
      state.isConfirmedPassword = false
    }
  }
})

export const {
  setState,
  signUpStart,
  signUpSuccess,
  signUpFail,
  signUpModalClosed,
  logInStart,
  logInSuccess,
  logInFail,
  logInModalClosed,
  logOut,
  confirmPasswordStart,
  confirmPasswordSuccess,
  confirmPasswordFail,
  confirmPasswordModalClosed
} = authSlice.actions

export const authSelector = state => state.auth

export default authSlice.reducer
