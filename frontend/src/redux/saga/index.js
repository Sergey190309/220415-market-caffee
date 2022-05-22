import { all } from 'redux-saga/effects'

import { lngsSaga, startInitSaga, techInSaga } from './tech'


export default function* rootSaga() {
  yield all([
    startInitSaga(),
    techInSaga(),
    lngsSaga()
  ])
}