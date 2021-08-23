import { all } from 'redux-saga/effects'

import { logInSaga, signUpSaga, confirmPasswordSaga } from './auth'
import { alertSaga } from './alerts'
import { startInitSaga, techInSaga, lngsSaga, i18nSaga } from './tech'
import { structureSaga } from './structure'

export default function * rootSaga () {
  yield all([
    alertSaga(),
    logInSaga(),
    signUpSaga(),
    confirmPasswordSaga(),
    startInitSaga(),
    techInSaga(),
    lngsSaga(),
    i18nSaga(),
    structureSaga()
  ])
}
