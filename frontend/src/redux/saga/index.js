import { all } from 'redux-saga/effects'

import { alertSaga }
 from './alerts'

import {
  structureSaga,
} from './structure'

import {
  lngsSaga, startInitSaga,
  techInSaga, i18nSaga
} from './tech'

export default function* rootSaga() {
  yield all([
    // alert saga ----------------
    alertSaga(),
    // stracture saga ----------------
    structureSaga(),
    // tech saga ----------------
    startInitSaga(),
    techInSaga(),
    lngsSaga(),
    i18nSaga()
  ])
}