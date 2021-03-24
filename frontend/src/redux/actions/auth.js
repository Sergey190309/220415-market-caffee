import axios from 'axios';
import {setAlert} from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const logInAction = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(email, ' - ', password)
  console.log(JSON.stringify({ email, password }))
  const body = JSON.stringify({ email, password });

  // try {
  //   const resp = await axios.post('http://127.0.0.1:5000/users/login', body, config);
  //   dispatch({
  //     type: REGISTER_SUCCESS,
  //     payload: resp.data,
  //   });
  // } catch (error) {
  //   const errors = error.response.data.errors;

  //   if (errors) {
  //     errors.forEach(error=>dispatch(setAlert(error.msg, 'error')))
  //   }

  //   dispatch({
  //     type: REGISTER_FAIL,
  //   });
  // }

};

