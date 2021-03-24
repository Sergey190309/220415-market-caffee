import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

export const initialStore = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const auth = (store = initialStore, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...store,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return {
        ...store,
        isAuthenticated: false,
        loading: false
      }
    default:
      return store;
  }
};

export default auth;
