import { call, put, takeEvery } from 'redux-saga/effects';
import {
  START_ALERT,
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from '../actions/types';
import { setAlertData } from '../actions/alert';
import axiosClient from '../../api/apiClient';
import { actRespErrorHandler, respErrorHandler } from '../../utils/respErrorHandler';

// function that makes the api request and returns a Promise for response
const logInCall = logInData => {
  try {
    // console.log('saga logInCall ->', logInData);
    const resp = axiosClient.post('/users/login', logInData);
    return resp;
  } catch (error) {
    console.log('logInCall error\n', error);
  }
};

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
    // console.log('logInFetch userData ->', userData.data.message);
    yield put({ type: LOG_IN_SUCCESS, payload: userData.data.payload });
    yield put({
      type: START_ALERT,
      payload: setAlertData({
        message: userData.data.message,
        alertType: 'info',
        timeout: 3000,
      }),
    });
  } catch (error) {
    yield put({ type: LOG_IN_FAIL, payload: error });
    const errorMessage = actRespErrorHandler(error)
    // console.log('logIn saga, error ->', error.response.data.message)
    // console.log('logIn saga, error ->', error.response.status)
    yield put({
      type: START_ALERT,
      payload: setAlertData({
        message: errorMessage,
        alertType: 'error',
        timeout: 5000
      })
    })
  }
}

// function that makes the api request and returns a Promise for response
const signUpCall = signUpData => {
  try {
    // console.log('saga signUpCall ->', signUpData);

    const resp = axiosClient.post('/users', signUpData);
    return resp;
  } catch (error) {
    console.log('signUpCall error\n', error);
  }
};

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* signUpSaga() {
  yield takeEvery(SIGN_UP_START, signUpFetch);
}

// worker saga: makes the api call when watcher saga sees the action
function* signUpFetch(action) {
  try {
    const userData = yield call(signUpCall, action.payload);
    // console.log('logInFetch userData ->', userData.data.payload);
    yield put({ type: SIGN_UP_SUCCESS, payload: userData.data.payload });
  } catch (error) {
    yield put({ type: SIGN_UP_FAIL, payload: error });
    const errorMessage = actRespErrorHandler(error)
    // console.log('logIn saga, error ->', error.response.data.message)
    // console.log('logIn saga, error ->', error.response.status)
    yield put({
      type: START_ALERT,
      payload: setAlertData({
        message: errorMessage,
        alertType: 'error',
        timeout: 5000
      })
    })
  }
}

// export default logInSaga;
