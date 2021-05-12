import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_MODAL_CLOSED,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_MODAL_CLOSED,
  LOG_OUT,
  TECH_IN_SUCCESS,
  TECH_IN_FAIL,
} from '../actions/types';
// import store from '../store'
import { axiosCommonToken } from '../../api/apiClient';

// ----------------------> DO NOT REMOVE
// store.LogIn keys are stated below and stored in localStorage:
// userName
// email
// isAuthenticated
// isAdmin
// access_token
// refresh_token
// tech_token

export const initialStore = {
  ...JSON.parse(localStorage.getItem('logInInfo')),
  // isAuthenticated: null,
  loading: null,
  isSignedUp: false,
  isLoggedIn: false,
};


export const setToken = (token) => {
  axiosCommonToken(token)
}

const auth = (store = initialStore, action, _setToken = setToken) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_OUT:
    case SIGN_UP_FAIL:
    case LOG_IN_FAIL:
      localStorage.removeItem('logInInfo');
      // const state = store.getState();
      _setToken(store.tech_token)
      return {
        tech_token: store.tech_token,
        isSignedUp: false,
        isLoggedIn: false,
        // isAuthenticated: false,
        loading: false,
      };
    case SIGN_UP_SUCCESS:
      localStorage.removeItem('logInInfo');
      return {
        isSignedUp: true,
        isLoggedIn: false,
        // isAuthenticated: false,
        loading: false,
      };
    case SIGN_UP_MODAL_CLOSED:
      return {
        ...store,
        isSignedUp: false,
      };
    case TECH_IN_SUCCESS:
      _setToken(payload)
      return {
        ...store,
        tech_token: payload,
      };
    case TECH_IN_FAIL:
      localStorage.removeItem('logInInfo');
      return {
        isSignedUp: false,
        isLoggedIn: false,
        loading: false,
      };
    case LOG_IN_SUCCESS:
      payload['isAuthenticated'] = true;
      axiosCommonToken(payload.access_token)
      localStorage.setItem('logInInfo', JSON.stringify(payload));
      return {
        ...store,
        ...payload,
        loading: false,
        isLoggedIn: true,
      };
    case LOG_IN_MODAL_CLOSED:
      return {
        ...store,
        isLoggedIn: false,
      };
    default:
      return store;
  }
};

export default auth;
