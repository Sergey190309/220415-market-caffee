// import { v4 } from 'uuid';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  START_ALERT,
  // SET_ALERT,
  REMOVE_ALERT,
} from '../actions/types';

import { delaySomthing } from './sagasUtils';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* alertSaga() {
  // console.log('alertSaga wathcher ->')
  yield takeEvery(START_ALERT, alertWorker);
}

// worker saga: makes the api call when watcher saga sees the action
export function* alertWorker(action) {
  // console.log('alertSaga worker ->', action.payload);
  yield call(delaySomthing, action.payload.timeout);
  yield put({
    type: REMOVE_ALERT,
    payload: action.payload.id,
  });
}
