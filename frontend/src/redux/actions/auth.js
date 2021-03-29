import axios from 'axios';
import { setAlert } from './alert';
import { LOG_IN_SUCCESS, LOG_IN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from './types';
import setAuthTokens from '../../utils/setAuthTokens';

export const signUpAction = (userName, email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const pre_body = {
    user_name: userName,
    email: email,
    password: password,
  };
  const body = JSON.stringify(pre_body);
  const url = 'http://127.0.0.1:5000/users';

  try {
    const resp = await axios.post(url, body, config);
    dispatch(setAlert(resp.data.message, 'info', 1000));
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
    dispatch({
      type: SIGN_UP_FAIL,
    });
  }
};

export const logInAction = (email, password) => async dispatch => {
  if (localStorage.access_token) {
    setAuthTokens(localStorage.access_token);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Headers': 'x-auth-token',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'
    },
  };
  const body = JSON.stringify({ email, password });
  const url = 'http://127.0.0.1:5000/users/login';

  try {
    const resp = await axios.post(url, body, config);
    console.log(resp.data.payload)
    dispatch(setAlert(resp.data.message, 'info', 1000));
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: resp.data.payload,
    });
  } catch (error) {
    if (error.message==='Network Error') {
      dispatch(setAlert(error.message, 'error'))
    } else {
      dispatch(setAlert(error.response.data.message, 'error'));
    }
    if (error.response.data.message) {
    }
    // console.log(error);
    dispatch({
      type: LOG_IN_FAIL,
    });
  }
};
