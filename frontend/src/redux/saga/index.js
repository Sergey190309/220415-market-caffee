import { all } from 'redux-saga/effects'

<<<<<<< HEAD
import { logInSaga, signUpSaga, confirmPasswordSaga } from './auth'
=======
>>>>>>> dev210823
import { alertSaga } from './alerts'
import { logInSaga, signUpSaga, confirmPasswordSaga } from './auth'
import { putTextSaga } from './backendUpdate'
import { startInitSaga, techInSaga, lngsSaga, i18nSaga } from './tech'
import { structureSaga } from './structure'

export default function * rootSaga () {
  yield all([
    alertSaga(),
    logInSaga(),
    signUpSaga(),
    confirmPasswordSaga(),
<<<<<<< HEAD
=======
    putTextSaga(),
>>>>>>> dev210823
    startInitSaga(),
    techInSaga(),
    lngsSaga(),
    i18nSaga(),
    structureSaga()
  ])
}
