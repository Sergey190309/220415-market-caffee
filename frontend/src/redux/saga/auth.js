import { call, put, takeEvery } from 'redux-saga/effects'
// import {
//   // START_ALERT,
//   // LOG_IN_START,
//   // LOG_IN_SUCCESS,
//   // LOG_IN_FAIL,
//   SIGN_UP_START,
//   SIGN_UP_SUCCESS,
//   SIGN_UP_FAIL,
// } from '../constants/type_s';
import {
  startAlert,
  signUpStart,
  signUpSuccess,
  signUpFail,
  logInStart,
  logInSuccess,
  logInFail,
  confirmPasswordStart,
  confirmPasswordSuccess,
  confirmPasswordFail
} from '../slices'
// import { setAlertData } from '../actions/alert';
// import axiosClient from '../../api/apiClient';
import { logInCall, signUpCall } from '../../api/calls/getAuthTechInfo'
import { actRespErrorMessage } from '../../utils/errorHandler'
// import { alertActions } from '../actions/alert';
// import { startAlert } from '../slices';
import { setAlertData } from '../../utils/utils'

export function * confirmPasswordSaga () {
  yield takeEvery(confirmPasswordStart.type, confirmPasswordFetch)
}

export function * confirmPasswordFetch (action) {
  try {
    // const accessToken = yield call(confirmPasswordCall, action.payload)
    // yield put(confirmPasswordSuccess(accessToken))
  } catch (error) {
    yield put(confirmPasswordFail(error))
    const errorMessage = actRespErrorMessage(error)
    yield put(
      startAlert(
        setAlertData({
          message: errorMessage,
          alertType: 'error',
          timeout: 5000
        })
      )
    )
  }
}
// watcher saga: watches for actions dispatched to the store, starts worker saga
export function * logInSaga () {
  // console.log('logInSaga wathcher ->')
  yield takeEvery(logInStart.type, logInFetch)
}

// worker saga: makes the api call when watcher saga sees the action
export function * logInFetch (action) {
  try {
    const userData = yield call(logInCall, action.payload)
    // console.log('saga, logInFetch, try, userData ->', userData)
    yield put(logInSuccess(userData.data.payload))
    yield put(
      startAlert(
        setAlertData({
          message: userData.data.message,
          alertType: 'info',
          timeout: 3000
        })
      )
    )
  } catch (error) {
    yield put(logInFail(error))
    // yield put({ type: LOG_IN_FAIL, payload: error });
    const errorMessage = actRespErrorMessage(error)
    // console.log('logIn saga, error ->', error.response.data.message)
    // console.log('logIn saga, error ->', error.response.status)
    yield put(
      startAlert(
        setAlertData({
          message: errorMessage,
          alertType: 'error',
          timeout: 5000
        })
      )
    )
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function * signUpSaga () {
  yield takeEvery(signUpStart.type, signUpFetch)
}

// worker saga: makes the api call when watcher saga sees the action
export function * signUpFetch (action) {
  // console.log('authSaga, signUpFetch, payload ->', action.payload)
  try {
    const userData = yield call(signUpCall, action.payload)
    yield put(signUpSuccess(userData.data.payload))
    // yield put({ type: SIGN_UP_SUCCESS, payload: userData.data.payload });
    yield put(
      startAlert(
        setAlertData({
          message: userData.data.message,
          alertType: 'info',
          timeout: 3000
        })
      )
    )
  } catch (error) {
    yield put(signUpFail(error))
    // console.log('signUpCall error ->', error.response.data.message);
    const errorMessage = actRespErrorMessage(error)
    yield put(
      startAlert(
        setAlertData({
          message: errorMessage,
          alertType: 'error',
          timeout: 5000
        })
      )
    )
  }
}

// export default logInSaga;
