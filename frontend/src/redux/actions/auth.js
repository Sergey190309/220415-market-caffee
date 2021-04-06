import { setAlert } from './alert';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_MODAL_CLOSED,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_MODAL_CLOSED,
  LOG_OUT,
} from './types';
import { actRespErrorHandler } from '../../utils/respErrorHandler';

import axiosClient from '../../api/apiClient';

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

export const signUpAction = (userName, email, password) => async dispatch => {
  try {
    const resp = await axiosClient.post(
      '/users',
      JSON.stringify({
        user_name: userName,
        email: email,
        password: password,
      })
    );
    dispatch(setAlert(resp.data.message, 'info', 1000));
    const _payload = { ...resp.data.payload, userName: resp.data.payload.user_name }
    delete _payload['user_name'];
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: _payload,
    });
  } catch (error) {
    actRespErrorHandler(error, dispatch, SIGN_UP_FAIL);
  }
};

export const logInAction = (email, password) => async dispatch => {
  // console.log('logInAction -', i18next.language);
  try {
    const resp = await axiosClient.post(
      '/users/login',
      JSON.stringify({ email, password })
    );
    // console.log(resp)
    const _payload = { ...resp.data.payload, userName: resp.data.payload.user_name };
    // setAlert(resp.data.message, 'info', 1000);
    delete _payload['user_name'];
    // console.log(_payload)
    dispatch(setAlert(resp.data.message, 'info', 1000));
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: _payload,
    });
  } catch (error) {
    // console.log(error)
    actRespErrorHandler(error, dispatch, LOG_IN_FAIL);
  }
};
