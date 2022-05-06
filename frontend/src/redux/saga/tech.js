import {
  call,
  // put,
  takeEvery
} from 'redux-saga/effects'
import { startInitLoading } from '../slices/tech'

export function* startInitSaga() {
   /**
   * Starting whole initial process
   */
  // console.log('startInitSaga')
  yield takeEvery(startInitLoading.type, startInitWorker)
}

const someInit = () => (
  console.log('startInitWorker')
)

export function* startInitWorker() {
  /**
   * It should start i18n initiation using direct call to i18n API.
   * When i18n has finished it should set I18N_INITIATED it true
  */
  yield call(someInit)
}