import axios from 'axios';
import { setAlert } from './alert';
import { LOG_IN_SUCCESS, LOG_IN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from './types';

export const callPost = (success, fail, url, body) => async dispatch => {
  console.log('callPost', success)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const rootPath = 'http://127.0.0.1:5000';
  const path = rootPath + url;
  try {
    const resp = await axios.post(path, body, config);
    dispatch(setAlert(resp.data.message, 'info', 7000));
    dispatch({
      type: success,
      payload: resp.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
    dispatch({
      type: fail,
    });
  }
};

export const signUpAction = (userName, email, password) => {
  const url = '/users';
  console.log('callSignUp')
  const pre_body = { user_name: userName, email: email, password: password };
  const body = JSON.stringify(pre_body);
  callPost(SIGN_UP_SUCCESS, SIGN_UP_FAIL, url, body);
};

export const logInAction = (email, password) => async dispatch=>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  const url = 'http://127.0.0.1:5000/users/login';

  try {
    const resp = await axios.post(url, body, config);
    dispatch(setAlert(resp.data.message, 'info', 1000));
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'error'));
    dispatch({
      type: LOG_IN_FAIL,
    });
  }
};

// export const logInAction = (email, password) => {
//   const url = '/users/login';
//   const body = JSON.stringify({ email, password });
//   console.log('callLogIn')
//   callPost(LOG_IN_SUCCESS, LOG_IN_FAIL,url, body);
// };
