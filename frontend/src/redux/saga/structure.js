import { call, put, takeEvery } from 'redux-saga/effects';
// import { call, put, takeEvery } from 'redux-saga/effects';
import { techAxiosClient } from '../../api/apiClient';
import { getViewStructure } from '../../api/calls/getViewsStructure';

// import { structureSuccess } from '../actions';
// import { STRUCTURE_START } from '../constants/type_s';
import {structureStart, structureSuccess  } from '../slices/structure'

// Watcher
export function* structureSaga() {
  yield takeEvery(structureStart.type, structureWorker);
}

// Worker
export function* structureWorker(action) {
  try {
    if (techAxiosClient.defaults.headers.common['Authorization'] === undefined) {
      return;
    }
    const result = yield call(getViewStructure);
    const viewStructures = result.data.payload.map(sturcture => ({
      [sturcture['view_id']]: sturcture['attributes'],
    }));
    // console.log('structureWorker, viewStructures ->', viewStructures);
    yield put(structureSuccess(viewStructures));
  } catch (error) {
    console.log('content worker, error', error);
  }
}
