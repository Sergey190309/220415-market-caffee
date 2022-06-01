import { all } from 'redux-saga/effects'

import { alertSaga } from './alerts'

import {
  logInSaga,
  signUpSaga,
  // confirmPasswordSaga
} from './auth'

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
    // auth saga ----------------
    logInSaga(),
    signUpSaga(),
    // confirmPasswordSaga(),
      // stracture saga ----------------
    structureSaga(),
    // tech saga ----------------
    startInitSaga(),
    techInSaga(),
    lngsSaga(),
    i18nSaga()
  ])
}