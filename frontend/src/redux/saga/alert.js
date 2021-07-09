// import { v4 } from 'uuid';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  // START_ALERT,
  // SET_ALERT,
  // REMOVE_ALERT,
} from '../constants/types';

// import { delaySomthing } from './sagasUtils';
import { delaySomthing } from '../../utils/utils'
import { removeAlert } from '../slices/alert';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* alertSaga() {
  // console.log('alertSaga wathcher ->')
  yield takeEvery('alerts/startAlert', alertWorker);
}

// worker saga: makes the api call when watcher saga sees the action
export function* alertWorker(action) {
  // console.log('alertSaga worker ->', action.payload.id);
  yield call(delaySomthing, action.payload.timeout);
  yield put(removeAlert(action.payload.id));
}
