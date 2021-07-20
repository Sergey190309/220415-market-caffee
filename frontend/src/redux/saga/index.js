import { all } from 'redux-saga/effects';
import { logInSaga, signUpSaga } from './auth';
import { alertSaga } from './alerts';
import { startInitSaga, techInSaga, lngsSaga, i18nSaga } from './tech';
import { structureSaga } from './structure'

export default function* rootSaga() {
  yield all([
    alertSaga(),
    logInSaga(),
    signUpSaga(),
    startInitSaga(),
    techInSaga(),
    lngsSaga(),
    i18nSaga(),
    structureSaga(),
  ]);
}
