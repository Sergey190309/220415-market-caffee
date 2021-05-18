// import { v4 } from 'uuid';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  START_ALERT,
  // SET_ALERT,
  REMOVE_ALERT,
} from '../actions/types';

export const delay = ms => new Promise(res => setTimeout(res, ms));

// export const showAlert = (alertData) => {
//   const id = v4()
//   const payloadData = {...alertData, id: id}
//   return ({
//     type: START_ALERT,
//     payload: payloadData
//   })
// }

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* alertSaga() {
  // console.log('alertSaga wathcher ->')
  yield takeEvery(START_ALERT, alertWorker);
}

// worker saga: makes the api call when watcher saga sees the action
export function* alertWorker(action) {
  // console.log('alertSaga worker ->', action.payload);
  yield call(delay, action.payload.timeout);
  yield put({
    type: REMOVE_ALERT,
    payload: action.payload.id,
  });
}

// const setAlert = (message, alertType, timeout = 3000) => {
//   const id = v4();
//   // console.log(message)
//   return ({
//     type: SET_ALERT,
//     payload: {
//       message,
//       alertType,
//       id,
//     },
//   });
//   setTimeout(() => ({ type: REMOVE_ALERT, payload: id }), timeout);
// }
