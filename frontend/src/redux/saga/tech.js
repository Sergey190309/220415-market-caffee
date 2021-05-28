import { v4 } from 'uuid';
import { call, put, takeEvery } from 'redux-saga/effects';
import i18next from 'i18next';

import { axiosCommonToken, axiosCommonLng } from '../../api/apiClientUtils';
import { techInCall, lngsCall } from '../../api/calls/getAuthTechInfo';
import {
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  lngsSuccess,
  lngsFail,
  startI18n,
  i18nFail,
  i18nSuccess,
  loadingSuccess,
} from '../actions/tech';
import {
  START_I18N,
  START_INIT_LOADING,
  START_LNGS,
  START_TECH_IN,
  // TECH_IN_FAIL,
  // TECH_IN_SUCCESS,
} from '../actions/types';

import { initI18next, setI18next } from '../../l10n/i18n';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* startInitSaga() {
  //the sa
  // console.log('logInSaga wathcher ->')
  yield takeEvery(START_INIT_LOADING, startInitWorker);
}

export function* startInitWorker() {
  yield put(startTechIn(v4()));
  // ==================================================================================
  // It should start i18n initiation using direct call to i18n API.
  // When i18n has finished it should set I18N_INITIATED it true
  // ==================================================================================
  yield call(initI18next);
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
    const resp = yield call(lngsCall);
    const lngs = resp.data.payload.map(item => item.id);
    // console.log('lngs worker, lngs ->', lngs)
    yield put(lngsSuccess());
    yield put(startI18n(lngs));
  } catch (error) {
    yield put(lngsFail(error));
  }
}

export function* i18nSaga() {
  yield takeEvery(START_I18N, i18nWorker);
}

export function* i18nWorker(action) {
  try {
    yield call(setI18next, action.payload)
    // console.log('i18n worker, i18next.languages ->', i18next.languages)
    // yield initI18next(action.payload);
    // yield put(i18nSuccess())
    yield call(axiosCommonLng, i18next.language);
    // console.log('i18nWorker, i18next.language ->', i18next.language)
    yield put(loadingSuccess());
  } catch (error) {
    yield put(i18nFail(error));
  }
}
