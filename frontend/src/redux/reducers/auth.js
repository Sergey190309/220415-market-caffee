import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  MODAL_CLOSED,
} from '../actions/types';

// ----------------------> DO NOT REMOVE
// store.LogIn keys are stated below and stored in localStorage:
// userName
// email
// isAuthenticated
// isAdmin
// access_token
// refresh_token

export const initialStore = {
  ...JSON.parse(localStorage.getItem('logInInfo')),
  // isAuthenticated: null,
  loading: null,
  isSignUp: false
};

const auth = (store = initialStore, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP_SUCCESS:
      localStorage.removeItem('logInInfo');
      return {
        isSignUp: true,
        isAuthenticated: false,
        loading: false,
      };

    case SIGN_UP_FAIL:
    case LOG_IN_FAIL:
      localStorage.removeItem('logInInfo');
      return {
        isSignUp: false,
        isAuthenticated: false,
        loading: false,
      };
    case LOG_IN_SUCCESS:
      payload['isAuthenticated'] = true;
      localStorage.setItem('logInInfo', JSON.stringify(payload));
      return {
        ...store,
        ...payload,
        loading: false,
      };
    case MODAL_CLOSED:
      return {
        ...store,
        isSignUp: false,
      }
    default:
      return store;
  }
};

export default auth;
