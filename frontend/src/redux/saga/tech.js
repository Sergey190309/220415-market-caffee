import { call, put, takeEvery } from 'redux-saga/effects'
import { v4 } from 'uuid'

import { lngsCall, techInCall } from '../../api/calls/getAuthTechInfo'
import { sagaErrorHandler } from '../../utils/errorHandler'
import {
  initI18next,
  setI18next
} from '../../l10n/i18n'
import {
  // structure slice -------------------------------
  structureStart,
  // tech slice -------------------------------
  startInitLoading, initLoadingSuccess,
  startTechIn, techInSuccess, techInFail,
  startLngs, lngsSuccess, lngsFail,
  startI18n, i18nSuccess,i18nFail
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
//--------------------------------------------------------
// Watcher
export function* lngsSaga() {
  yield takeEvery(startLngs.type, lngsWorker)
}

// Worker
export function* lngsWorker() {
  // export function* lngsWorker(action) {
  // console.log('lngsWorker')
  try {
    const resp = yield call(lngsCall)
    // console.log('lngsWorker, resp ->', resp)
    const lngs = resp.data.payload.map(item => item.id)
    // console.log('tech, saga, lngs worker, lngs ->', lngs)
    yield put(lngsSuccess())
    yield put(startI18n(lngs))
  } catch (error) {
    console.log('lngsWorker, error ->', error)
    sagaErrorHandler(error)
    yield put(lngsFail())
  }
}
//--------------------------------------------------------

export function* i18nSaga() {
  yield takeEvery(startI18n.type, i18nWorker)
}

export function* i18nWorker(action) {
  // console.log('i18nWorker, action ->', action)
  try {
    /**
     * Set lng switcher and current language according locales
     * awailable on back end.
     */
    yield call(setI18next, action.payload)
    yield put(i18nSuccess())
    /**
     * initate structure loading here
     */
    yield put(initLoadingSuccess())
    yield put(structureStart())
  } catch (error) {
    sagaErrorHandler(error)
    yield put(i18nFail())
  }
}
