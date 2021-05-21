import { v4 } from 'uuid';
import { call, put, takeEvery } from 'redux-saga/effects';

import { axiosCommonToken } from '../../api/apiClient';
import { techInCall } from '../../api/calls/getAuthTechInfo';
import { startTechIn, startLngs, techInSuccess, techInFail } from '../actions/tech';
import {
  START_INIT_LOADING,
  START_LNGS,
  START_TECH_IN,
  TECH_IN_FAIL,
  TECH_IN_SUCCESS,
} from '../actions/types';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* startInitSaga() {
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
export function* techInFetch(action) {
  try {
    const techInResp = yield call(techInCall, { tech_id: action.payload });
    yield put(techInSuccess(techInResp.data.payload));
    // axiosCommonToken(techInResp.data.payload);
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
    const lngs = yield call();
  } catch (error) {}
}

// export const techInCall = techInData => {
//   const resp = axiosClient.post('/home/tech/auth', techInData);
//   return resp;
// };

// export const techInAction = async (sessionId = v4()) => {
// export const techInAction =
//   (sessionId = v4()) =>
//   async dispatch => {
//     try {
//       const resp = await axiosClient.post('/home/tech/auth', { tech_id: sessionId });
//       // console.log('actions auth, techInAction,q resp ->', resp.data.payload)
//       dispatch({
//         type: TECH_IN_SUCCESS,
//         payload: resp.data.payload ? resp.data.payload : null,
//       });
//     } catch (error) {
//       actRespErrorMessage(error, dispatch, TECH_IN_FAIL);
//     }
//   };
