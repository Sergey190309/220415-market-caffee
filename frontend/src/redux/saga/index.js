import { all } from 'redux-saga/effects'

import { startInitSaga } from './tech'


export default function* rootSaga() {
  yield all([
    startInitSaga()
  ])
}