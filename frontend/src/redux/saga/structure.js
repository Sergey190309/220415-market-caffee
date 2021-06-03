import { call, takeEvery } from 'redux-saga/effects';
// import { call, put, takeEvery } from 'redux-saga/effects';
import axiosClient from '../../api/apiClient';
import { getViewStructure } from '../../api/calls/getViewsStructure';

import { structureSuccess } from '../actions';
import { STRUCTURE_START } from '../actions/types';

// Watcher
export function* structureSaga() {
  yield takeEvery(STRUCTURE_START, structureWorker);
}

// Worker
export function* structureWorker(action) {
  try {
    if (axiosClient.defaults.headers.common['Authorization'] === undefined) {
      console.log('content worker, viewName ->')
      return;
    }
    const result = yield call(getViewStructure, action.payload);
    // console.log('structureWorker, viewStructure ->', result.data.payload);
    const viewStructures = result.data.payload;
    console.log('structureWorker, viewStructures ->', viewStructures);
    yield structureSuccess(viewStructures);
  } catch (error) {
    console.log('content worker, error', error);
  }
}
