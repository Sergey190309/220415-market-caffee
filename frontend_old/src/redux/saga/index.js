import { all } from 'redux-saga/effects'

import { alertSaga } from './alerts'
import { logInSaga, signUpSaga, confirmPasswordSaga } from './auth'
import { putTextSaga, addElementSaga, removeElementSaga } from './backendUpdate'
import { startInitSaga, techInSaga, lngsSaga, i18nSaga } from './tech'
import { structureSaga } from './structure'

export default function * rootSaga () {
  yield all([
    alertSaga(),
    logInSaga(),
    signUpSaga(),
    confirmPasswordSaga(),
    putTextSaga(),
    addElementSaga(),
    removeElementSaga(),
    startInitSaga(),
    techInSaga(),
    lngsSaga(),
    i18nSaga(),
    structureSaga()
  ])
}
