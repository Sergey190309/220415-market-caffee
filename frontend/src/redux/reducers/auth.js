import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
} from '../actions/types';

export const initialStore = {
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  isAuthenticated: null,
  loading: true,
  userName: null,
  email:null
};

const auth = (store = initialStore, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP_SUCCESS:
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userName')
      localStorage.removeItem('email')
      return {
        ...store,
        isAuthenticated: false,
        loading: false,
      };
    case SIGN_UP_FAIL:
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userName')
      localStorage.removeItem('email')
    return {
        ...store,
        isAuthenticated: false,
        loading: false,
      };
    case LOG_IN_SUCCESS:
      localStorage.setItem('access_token', payload.access_token);
      localStorage.setItem('refresh_token', payload.refresh_token);
      localStorage.setItem('userName', payload.user_name)
      localStorage.setItem('email', payload.email)
      return {
        ...store,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOG_IN_FAIL:
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userName')
      localStorage.removeItem('email')
      return {
        ...store,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return store;
  }
};

export default auth;
