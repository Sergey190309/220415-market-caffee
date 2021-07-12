import { createSlice } from '@reduxjs/toolkit';

import { axiosCommonToken, authAxiosClient } from '../../api/apiClient';

const notLoggedInfo = {
  user_name: '',
  email: '',
  isAdmin: false,
  isAuthenticated: false,
  access_token: '',
  refresh_token: '',
};

export const initialState = {
  ...JSON.parse(
    localStorage.getItem('logInInfo')
      ? localStorage.getItem('logInInfo')
      : { ...notLoggedInfo }
  ),
  // isAuthenticated: null,
  loading: false,
  isSignedUp: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpStart: state => {
      state = {
        ...state,
        loading: true,
      };
    },
    signUpSuccess: state => {
      localStorage.removeItem('logInInfo');
      state = {
        ...state,
        isSignedUp: true,
        isLoggedIn: false,
        loading: false,
      };
    },
    signUpFail: state => {
      localStorage.removeItem('logInInfo');
      state = {
        ...state,
        ...notLoggedInfo,
        isSignedUp: false,
        isLoggedIn: false,
        loading: false,
      };
    },
    logInStart: state => {
      state = {
        ...state,
        loading: true,
      };
    },
    logInSuccess: (state, { payload }) => {
      payload.isAuthenticated = true;
      axiosCommonToken(payload.access_token, authAxiosClient);
      localStorage.setItem('logInInfo', JSON.stringify(payload));
      state = {
        ...state,
        ...payload,
        loading: false,
        isLoggedIn: true,
      };
    },
    logInFail: state => {
      state = {
        ...state,
        ...notLoggedInfo,
        isSignedUp: false,
        isLoggedIn: false,
        loading: false,
      };
    },
    logOut: state => {
      localStorage.removeItem('logInInfo');
      state = {
        ...state,
        ...notLoggedInfo,
        isSignedUp: false,
        isLoggedIn: false,
        loading: false,
      };
    },
    signUpModalClosed: state => {
      state = {
        ...state,
        isSignedUp: false,
      };
    },
    logInModalClosed: state => {
      state = {
        ...state,
        isLoggedIn: false,
      };
    },
  },
});


export const {
  signUpStart,
    signUpSuccess,
    signUpFail,
    logInStart,
    logInSuccess,
    logInFail,
    logOut,
    signUpModalClosed,
    logInModalClosed,
} = authSlice.actions

export const authSelector = (state) => state.auth
export default authSlice.reducer
