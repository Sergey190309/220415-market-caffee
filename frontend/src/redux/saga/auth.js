import { call, put, takeEvery } from 'redux-saga/effects'
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

import { setAxiosAuthToken } from '../../api/apiClient'
import { logInCall, signUpCall, confirmPasswordCall } from '../../api/calls/getAuthTechInfo'
import { actRespErrorMessage } from '../../utils/errorHandler'
import { setAlertData } from '../../utils/utils'

export function * confirmPasswordSaga () {
  yield takeEvery(confirmPasswordStart.type, confirmPasswordFetch)
}

export function * confirmPasswordFetch (action) {
  try {
    // console.log('confirmPasswordFetch, action ->', action.payload)
    const resp = yield call(confirmPasswordCall, action.payload)
    setAxiosAuthToken({ access_token: resp.data.payload.access_token })
    yield put(confirmPasswordSuccess(resp.data.payload.access_token))
    yield put(
      startAlert(
        setAlertData({
          message: resp.data.message,
          alertType: 'info',
          timeout: 5000
        })
      )
    )
  } catch (error) {
    console.log('confirmPasswordFetch, error ->', error)
    yield put(confirmPasswordFail())
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
