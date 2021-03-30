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

import apiClient from '../../api/apiClient';

export const logOutAction = () => despatch => {
  despatch({
    type: LOG_OUT,
  });
};

export const setSignedUpFalse = () => dispatch => {
  dispatch({
    type: SIGN_UP_MODAL_CLOSED,
  });
};
export const setLoggedInFalse = () => dispatch => {
  dispatch({
    type: LOG_IN_MODAL_CLOSED,
  });
};

export const signUpAction = (userName, email, password) => async dispatch => {
  try {
    const resp = await apiClient.post(
      '/users',
      JSON.stringify({
        user_name: userName,
        email: email,
        password: password,
      })
    );
    dispatch(setAlert(resp.data.message, 'info', 1000));
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    actRespErrorHandler(error, dispatch, SIGN_UP_FAIL);
  }
};

export const logInAction = (email, password) => async dispatch => {
  try {
    const resp = await apiClient.post(
      '/users/login',
      JSON.stringify({ email, password })
    );
    dispatch(setAlert(resp.data.message, 'info', 1000));
    const _payload = { ...resp.data.payload, userName: resp.data.payload.user_name };
    delete _payload['user_name'];
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: _payload,
    });
  } catch (error) {
    actRespErrorHandler(error, dispatch, LOG_IN_FAIL);
  }
};
