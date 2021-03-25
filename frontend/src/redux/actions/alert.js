import { v4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (message, alertType, timeout = 3000) => dispatch => {
  const id = v4();
  // console.log(message)
  dispatch({
    type: SET_ALERT,
    payload: {
      message,
      alertType,
      id,
    },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
