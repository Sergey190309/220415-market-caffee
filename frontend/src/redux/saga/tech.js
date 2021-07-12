import { v4 } from 'uuid';
import { call, put, takeEvery } from 'redux-saga/effects';
// import i18next from 'i18next';

// import { axiosCommonToken, axiosCommonLng } from '../../api/apiClientUtils';
import { sagaErrorHandler } from '../../utils/errorHandler';

import {
  // START_I18N,
  // START_INIT_LOADING,
  // START_LNGS,
  // START_TECH_IN,
  // TECH_IN_FAIL,
  // TECH_IN_SUCCESS,
} from '../constants/types';
import {
  startInitLoading,
  initLoadingSuccess,
  startTechIn,
  techInSuccess,
  techInFail,
  startLngs,
  lngsSuccess,
  lngsFail,
  startI18n,
  i18nSuccess,
  i18nFail,
} from '../slices/tech'
import {
  // startTechIn,
  // techInSuccess,
  // techInFail,
  // startLngs,
  // lngsSuccess,
  // lngsFail,
  // startI18n,
  // i18nFail,
  // i18nSuccess,
  // loadingSuccess,
} from '../actions/tech';

import { structureStart } from '../actions/structure';
// import { alertActions } from '../actions/alert';

import { techInCall, lngsCall } from '../../api/calls/getAuthTechInfo';
import { initI18next, setI18next } from '../../l10n/i18n';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* startInitSaga() {
  //the sa
  // console.log('logInSaga wathcher ->')
  yield takeEvery(startInitLoading.type, startInitWorker);
}

export function* startInitWorker() {
  yield put(startTechIn(v4()));
  // ==================================================================================
  // It should start i18n initiation using direct call to i18n API.
  // When i18n has finished it should set I18N_INITIATED it true
  // ==================================================================================
  const lngs = ['en'];
  yield call(initI18next, lngs);
}

// watcher
export function* techInSaga() {
  yield takeEvery(startTechIn.type, techInFetch);
}

// Worker
export function* techInFetch(action) {
  // export function* techInFetch(action, setToken = axiosCommonToken) {
  try {
    const techInResp = yield call(techInCall, { tech_id: action.payload });
    // console.log('techInFetch, techInResp ->', techInResp.data.payload)
    yield put(techInSuccess(techInResp.data.payload));
    // ----------------------------------------------------------------------------------
    // initate structure loading here
    yield put(structureStart());
    yield put(startLngs());
  } catch (error) {
    yield sagaErrorHandler(error)
    // if (error.response) {
    //   console.log('sagaErrorHandler, error.response ->');
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    // } else if (error.request) {
    // } else {
    //   console.log('Error', error.message);
    // }

    // console.log('techInFetch, error ->', error.message);
    // sagaErrorHandler(error);
    // yield call(sagaErrorHandler, error)
    yield put(techInFail(error));
  }
}

// Watcher
export function* lngsSaga() {
  yield takeEvery(startLngs.type, lngsWorker);
}

// Worker
export function* lngsWorker(action) {
  try {
    const resp = yield call(lngsCall);
    const lngs = resp.data.payload.map(item => item.id);
    // console.log('lngs worker, lngs ->', lngs)
    yield put(lngsSuccess());
    yield put(startI18n(lngs));
  } catch (error) {
    // sagaErrorHandler(error);
    yield put(lngsFail(error));
  }
}

export function* i18nSaga() {
  yield takeEvery(startI18n.type, i18nWorker);
}

export function* i18nWorker(
  action
  // setI18n = setI18next,
  // setCommonLng = axiosCommonLng
) {
  try {
    yield call(setI18next, action.payload); // Set lng switcher and current language
    // according locales awailable on back end.

    // console.log('i18n worker, i18next.languages ->', i18next.languages)
    // call(axiosCommonLng, i18next.language); // Set axios header for backend calls.
    yield put(i18nSuccess());
    // console.log('i18nWorker, i18next.language ->', i18next.language)
    yield put(initLoadingSuccess());
  } catch (error) {
    yield put(i18nFail(error));
  }
}
