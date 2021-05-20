import { all } from 'redux-saga/effects';
import { logInSaga, signUpSaga } from './auth';
import { alertSaga } from './alert';
import { startInitSaga, techInSaga } from './tech';

export default function* rootSaga() {
  yield all([alertSaga(), logInSaga(), signUpSaga(), startInitSaga(), techInSaga()]);
}
