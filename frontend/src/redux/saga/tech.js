import { call, put, takeEvery } from 'redux-saga/effects'
import { v4 } from 'uuid'

import { techInCall } from '../../api/calls/getAuthTechInfo'
import { sagaErrorHandler } from '../../utils/errorHandler'
import {
  initI18next,
  // setI18next
} from '../../l10n/i18n'
import {
  startInitLoading,
  startLngs,
  startTechIn,
  techInFail,
  techInSuccess
} from '../slices'

export function* startInitSaga() {
  /**
  * Starting whole initial process
  */
  // console.log('startInitSaga ->', startInitLoading.type)
  yield takeEvery(startInitLoading.type, startInitWorker)
}

export function* startInitWorker() {
  /**
   * That starting of initiation process:
   */
  // console.log('startInitSagaWorker ->', typeof (startTechIn))
  // startTechIn()
  yield put(startTechIn(v4()))
  /**
   * It should start i18n initiation using direct call to i18n API.
   * When i18n has finished it should set I18N_INITIATED true
  */
  yield call(initI18next)
}
//--------------------------------------------------------
// watcher
export function* techInSaga() {
  yield takeEvery(startTechIn.type, techInFetch)
}
// worker
export function* techInFetch(action) {
  /**
   * The saga fetch tech token. If success fire sagas to fetch structure and lngs.
   */
  try {
    const techInResp = yield call(
      techInCall, { tech_id: action.payload })
    // console.log('techInFetch, techInResp ->', techInResp.data.payload)
    yield put(techInSuccess(techInResp.data.payload))
    yield put(startLngs())
  } catch (error) {
    // console.log('techInFetch, error.code ->', error.code)

    yield sagaErrorHandler(error)
    yield put(techInFail())
  }
}