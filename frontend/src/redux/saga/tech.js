import {
  call,
  // put,
  takeEvery
} from 'redux-saga/effects'

// import { v4 } from 'uuid'

import {
  initI18next,
  // setI18next
} from '../../l10n/i18n'
import {
  startInitLoading, startTechIn
} from '../slices/tech'

export function* startInitSaga() {
   /**
   * Starting whole initial process
   */
  // console.log('startInitSaga')
  yield takeEvery(startInitLoading.type, startInitWorker)
}

export function* startInitWorker() {
  /**
   * That starting of initiation process:
   */
  console.log('startInitSagaWorker ->', typeof (startTechIn))
  // startTechIn()
  //  yield put(startTechIn(v4()))
  /**
   * It should start i18n initiation using direct call to i18n API.
   * When i18n has finished it should set I18N_INITIATED true
  */
  yield call(initI18next)
}