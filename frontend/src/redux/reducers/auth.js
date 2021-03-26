import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
} from '../actions/types';

export const initialStore = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const auth = (store = initialStore, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...store,
        isAuthenticated: false,
        loading: false,
      };
    case SIGN_UP_FAIL:
      localStorage.removeItem('token');
      return {
        ...store,
        isAuthenticated: false,
        loading: false,
      };
    case LOG_IN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...store,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOG_IN_FAIL:
      localStorage.removeItem('token');
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
