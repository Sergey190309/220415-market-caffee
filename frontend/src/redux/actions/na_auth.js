// import { setAlert } from './alert';
import {
  LOG_IN_MODAL_CLOSED,
  LOG_IN_START,
  SIGN_UP_START,
  SIGN_UP_MODAL_CLOSED,
  LOG_OUT,
} from '../constants/types';

export const logOutAction = () => {
  return {
    type: LOG_OUT,
  };
};

export const setSignedUpFalse = () => {
  return {
    type: SIGN_UP_MODAL_CLOSED,
  };
};
export const setLoggedInFalse = () => {
  return {
    type: LOG_IN_MODAL_CLOSED,
  };
};

export const signUpAction = signUpData => ({
  type: SIGN_UP_START,
  payload: signUpData,
});

export const logInAction = logInData => {
  // console.log('actions, login data ->', logInData);
  return {
    type: LOG_IN_START,
    payload: logInData,
  };
};
