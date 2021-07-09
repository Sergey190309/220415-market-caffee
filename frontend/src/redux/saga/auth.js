import { call, put, takeEvery } from 'redux-saga/effects';
import {
  // START_ALERT,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from '../constants/types';
// import { setAlertData } from '../actions/alert';
// import axiosClient from '../../api/apiClient';
import { logInCall, signUpCall } from '../../api/calls/getAuthTechInfo';
import { actRespErrorMessage } from '../../utils/errorHandler';
// import { alertActions } from '../actions/alert';
import { startAlert } from '../slices/alert';
import { setAlertData } from '../../utils/utils';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* logInSaga() {
  // console.log('logInSaga wathcher ->')
  yield takeEvery(LOG_IN_START, logInFetch);
}

// worker saga: makes the api call when watcher saga sees the action
export function* logInFetch(action) {
  // console.log('saga, logInFetch ->', action);
  try {
    const userData = yield call(logInCall, action.payload);
    yield put({ type: LOG_IN_SUCCESS, payload: userData.data.payload });
    yield put(
      startAlert(
        setAlertData({
          message: userData.data.message,
          alertType: 'info',
          timeout: 3000,
        })
      )
    );
  } catch (error) {
    yield put({ type: LOG_IN_FAIL, payload: error });
    const errorMessage = actRespErrorMessage(error);
    // console.log('logIn saga, error ->', error.response.data.message)
    // console.log('logIn saga, error ->', error.response.status)
    yield put(
      startAlert(
        setAlertData({
          message: errorMessage,
          alertType: 'error',
          timeout: 5000,
        })
      )
    );
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* signUpSaga() {
  yield takeEvery(SIGN_UP_START, signUpFetch);
}

// worker saga: makes the api call when watcher saga sees the action
export function* signUpFetch(action) {
  try {
    const userData = yield call(signUpCall, action.payload);
    // console.log('logInFetch userData ->', userData.data.payload);
    yield put({ type: SIGN_UP_SUCCESS, payload: userData.data.payload });
    yield put(
      startAlert(
        setAlertData({
          message: userData.data.message,
          alertType: 'info',
          timeout: 3000,
        })
      )
    );
  } catch (error) {
    yield put({ type: SIGN_UP_FAIL, payload: error });
    const errorMessage = actRespErrorMessage(error);
    yield put(
      startAlert(
        setAlertData({
          message: errorMessage,
          alertType: 'error',
          timeout: 5000,
        })
      )
    );
  }
}

// export default logInSaga;
