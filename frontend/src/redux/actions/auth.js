import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const logInAction = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // console.log(email, ' - ', password)
  // console.log(JSON.stringify({ email, password }))
  const body = JSON.stringify({ email, password });

  try {
    const resp = await axios.post('http://127.0.0.1:5000/users/login', body, config);
    // console.log(resp.data.payload);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch(setAlert(error.response.data.message, 'error'))

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
