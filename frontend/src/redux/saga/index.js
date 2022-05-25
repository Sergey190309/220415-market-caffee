import { all } from 'redux-saga/effects'

import {
  lngsSaga, startInitSaga,
  techInSaga, i18nSaga
} from './tech'


export default function* rootSaga() {
  yield all([
    startInitSaga(),
    techInSaga(),
    lngsSaga(),
    i18nSaga()
  ])
}