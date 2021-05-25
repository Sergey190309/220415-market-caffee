import { v4 } from 'uuid';
import { call, put, takeEvery } from 'redux-saga/effects';

import { axiosCommonToken } from '../../api/apiClientUtils';
import { techInCall, lngsCall } from '../../api/calls/getAuthTechInfo';
import {
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  lngsSuccess,
  lngsFail,
  startI18n,
} from '../actions/tech';
import {
  START_I18N,
  START_INIT_LOADING,
  START_LNGS,
  START_TECH_IN,
  // TECH_IN_FAIL,
  // TECH_IN_SUCCESS,
} from '../actions/types';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* startInitSaga() {
  //the sa
  // console.log('logInSaga wathcher ->')
  yield takeEvery(START_INIT_LOADING, startInitWorker);
}

export function* startInitWorker() {
  yield put(startTechIn(v4()));
  // yield put({ type: START_TECH_IN, payload: v4() });
}

// watcher
export function* techInSaga() {
  yield takeEvery(START_TECH_IN, techInFetch);
}

// Worker
export function* techInFetch(action, setToken = axiosCommonToken) {
  try {
    const techInResp = yield call(techInCall, { tech_id: action.payload });
    yield put(techInSuccess(techInResp.data.payload));
    // console.log('techInFetch, success, techToken ->', techInResp.data.payload)
    // setToken(techInResp.data.payload);
    // call(setToken, techInResp.data.payload);
    yield call(setToken, techInResp.data.payload);
    yield put(startLngs());
  } catch (error) {
    yield put(techInFail(error));
  }
}

export function* lngsSaga() {
  yield takeEvery(START_LNGS, lngsWorker);
}

export function* lngsWorker(action) {
  try {
    const lngs = yield call(lngsCall);
    yield put(lngsSuccess(lngs));
    yield put(startI18n(lngs))
  } catch (error) {
    yield put(lngsFail(error))
  }
}

export function* i18nSaga() {
  yield takeEvery(START_I18N)
}

export function* i18bWorker(action) {
  try {

  } catch (error) {

  }
}