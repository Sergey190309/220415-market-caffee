import { all } from 'redux-saga/effects'

import { startInitSaga, techInSaga } from './tech'


export default function* rootSaga() {
  yield all([
    startInitSaga(),
    techInSaga()
  ])
}