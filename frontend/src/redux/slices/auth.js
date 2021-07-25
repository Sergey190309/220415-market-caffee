import { createSlice } from '@reduxjs/toolkit';

import { axiosCommonToken, authAxiosClient } from '../../api/apiClient';
import { LOG_IN_INFO } from '../constants/localStorageVariables';

export const notLoggedInfo = {
  /**
   * Used for create and return to 'empty' set of state values
   */
  user_name: '',
  email: '',
  isAdmin: false,
  access_token: '',
  refresh_token: '',
};

export const logInInfo = () => {
  /**
   * Used to avoin undefined value if local ctorage does not contain
   * needed variables.
   */
  const _localStorage = localStorage.getItem(LOG_IN_INFO)
    ? { ...JSON.parse(localStorage.getItem(LOG_IN_INFO)), isLoggedIn: true }
    : { ...notLoggedInfo, isLoggedIn: false };
  // console.log('auth slice, logInInfo, _localStorage ->', _localStorage);
  return _localStorage;
};

export const initialState = () => ({
  ...logInInfo(),
  loading: false,
  isSignedUp: false,
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),
  reducers: {
    setState: (state, { payload }) => {
      Object.keys(state).forEach(key => {
        delete state[key]
      })
      Object.assign(state, payload)
    },
    signUpStart: state => {
      state.loading = true;
      state.isSignedUp = false;
      state.isLoggedIn = false;
    },
    signUpSuccess: state => {
      localStorage.removeItem(LOG_IN_INFO);
      state.loading = false;
      state.isSignedUp = true;
      state.isLoggedIn = false;
    },
    signUpFail: state => {
      localStorage.removeItem(LOG_IN_INFO);
      Object.assign(state, notLoggedInfo, {
        isSignedUp: false,
        isLoggedIn: false,
        loading: false,
      });
    },
    logInStart: state => {
      state.loading = true;
      state.isSignedUp = false;
      state.isLoggedIn = false;
    },
    logInSuccess: (state, { payload }) => {
      // payload.isAuthenticated = true;
      // console.log('authSlice, logInSuccess, payload ->', payload);
      axiosCommonToken(payload.access_token, authAxiosClient);
      localStorage.setItem(LOG_IN_INFO, JSON.stringify(payload));
      Object.assign(state, payload, { loading: false, isLoggedIn: true });
    },
    logInFail: state => {
      Object.assign(state, notLoggedInfo, {
        loading: false,
        isSignedUp: false,
        isLoggedIn: false,
      });
    },
    logOut: state => {
      // console.log('authSlice, logOut')
      localStorage.removeItem(LOG_IN_INFO);
      Object.assign(state, notLoggedInfo, {
        loading: false,
        isSignedUp: false,
        isLoggedIn: false,
      });
    },
    signUpModalClosed: state => {
      state.isSignedUp = false;
    },

    logInModalClosed: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  setState,
  signUpStart,
  signUpSuccess,
  signUpFail,
  logInStart,
  logInSuccess,
  logInFail,
  logOut,
  signUpModalClosed,
  logInModalClosed,
} = authSlice.actions;

export const authSelector = state => state.auth;

export default authSlice.reducer;
