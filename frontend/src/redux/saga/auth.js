import {
  call, put, takeEvery,
  select
} from 'redux-saga/effects'
import {
  CONTENT_UPDATE,
  STRUCTURE_ADD,
  STRUCTURE_REMOVE
} from '../../redux/constants/types'
import {
  startAlert,
  signUpStart, signUpSuccess, signUpFail,
  logInStart, logInSuccess, logInFail,
  confirmPasswordStart, confirmPasswordSuccess,
  confirmPasswordFail,
  backendTxtUpdateStart, backendAddElementStart,
  backendRemoveElementStart,
  // backendUpdateSelector
} from '../slices'

import { setAxiosAuthAccessToken } from '../../api/apiClient'
import { logInCall, signUpCall, confirmPasswordCall } from '../../api/calls/getAuthTechInfo'
import { actRespErrorMessage } from '../../utils/errorHandler'
import { setAlertData } from '../../utils/utils'

export function* logInSaga() {
  yield takeEvery(logInStart.type, logInFetch)
}

export function* logInFetch(action) {
  try {
    const userData = yield call(logInCall, action.payload)
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
    // console.log('saga>auth>logInFetch, catch, error ->', error)
    yield put(logInFail(error))
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

export function* signUpSaga() {
  yield takeEvery(signUpStart.type, signUpFetch)
}

export function* signUpFetch(action) {
  try {
    const userData = yield call(signUpCall, action.payload)
    yield put(signUpSuccess(userData.data.payload))
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
  // console.log('saga>auth>signUpFetch, error ->', error)
  yield put(signUpFail(error))
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

export function* confirmPasswordSaga() {
  yield takeEvery(confirmPasswordStart.type,
    confirmPasswordFetch)
}

export function* confirmPasswordFetch(action) {
  //   const { kind } = yield select(backendUpdateSelector)
  //   // console.log('saga, auth:\n confirmPasswordFetch',
  //   //   '\n  kind ->', kind)
  //   try {
  //     const resp = yield call(confirmPasswordCall, action.payload)
  //     setAxiosAuthAccessToken(resp.data.payload.access_token)
  //     yield put(confirmPasswordSuccess(resp.data.payload.access_token))
  //     switch (kind) {
  //       case CONTENT_UPDATE:
  //         yield put(backendTxtUpdateStart())
  //         break
  //       case STRUCTURE_ADD:
  //         yield put(backendAddElementStart())
  //         break
  //       case STRUCTURE_REMOVE:
  //         yield put(backendRemoveElementStart())
  //         break
  //       default:
  //         break
  //     }
  //     yield put(
  //       startAlert(
  //         setAlertData({
  //           message: resp.data.message,
  //           alertType: 'info',
  //           timeout: 3000
  //         })
  //       )
  //     )
  //   } catch (error) {
  //     console.log('confirmPasswordFetch, error ->', error)
  //     yield put(confirmPasswordFail())
  //     const errorMessage = actRespErrorMessage(error)
  //     yield put(
  //       startAlert(
  //         setAlertData({
  //           message: errorMessage,
  //           alertType: 'error',
  //           timeout: 5000
  //         })
  //       )
  //     )
  //   }
}
