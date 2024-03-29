import { v4 } from 'uuid'
import { call, put, takeEvery } from 'redux-saga/effects'

import { sagaErrorHandler } from '../../utils/errorHandler'

import {
  startInitLoading,
  initLoadingSuccess,
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  lngsSuccess,
  lngsFail,
  startI18n,
  i18nSuccess,
  i18nFail
} from '../slices/tech'

import { structureStart } from '../slices/structure'

import { techInCall, lngsCall } from '../../api/calls/getAuthTechInfo'
import { initI18next, setI18next } from '../../l10n/i18n'

export function * startInitSaga () {
  /**
   * Starting whole initial process
   */
  yield takeEvery(startInitLoading.type, startInitWorker)
}

export function * startInitWorker () {
  yield put(startTechIn(v4()))
  /**
   * It should start i18n initiation using direct call to i18n API.
   * When i18n has finished it should set I18N_INITIATED it true
   */
  yield call(initI18next)
  // yield call(initI18next, lngs);
}

// watcher
export function * techInSaga () {
  yield takeEvery(startTechIn.type, techInFetch)
}

// Worker
export function * techInFetch (action) {
  /**
   * The saga fetch tech token. If success fire sagas to fetch structure and lngs.
   */
  try {
    // console.log('techInFetch, techInCall args ->', action.payload)
    const techInResp = yield call(techInCall, { tech_id: action.payload })
    // console.log('techInFetch, techInResp ->', techInResp)
    yield put(techInSuccess(techInResp.data.payload))
    yield put(startLngs())
  } catch (error) {
    yield sagaErrorHandler(error)
    yield put(techInFail(error))
  }
}

// Watcher
export function * lngsSaga () {
  yield takeEvery(startLngs.type, lngsWorker)
}

// Worker
export function * lngsWorker (action) {
  try {
    const resp = yield call(lngsCall)
    // console.log('lngsWorker, resp ->', resp)
    const lngs = resp.data.payload.map(item => item.id)
    // console.log('tech, saga, lngs worker, lngs ->', lngs)
    yield put(lngsSuccess())
    yield put(startI18n(lngs))
  } catch (error) {
    // sagaErrorHandler(error);
    yield put(lngsFail(error))
  }
}

export function * i18nSaga () {
  yield takeEvery(startI18n.type, i18nWorker)
}

export function * i18nWorker (
  action
) {
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
    yield put(structureStart())
    yield put(initLoadingSuccess())
  } catch (error) {
    yield put(i18nFail(error))
  }
}
