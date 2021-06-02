import { call, put, takeEvery } from 'redux-saga/effects';
import axiosClient from '../../api/apiClient';
import { getViewStructure } from '../../api/calls/getViewsStructure';

import { STRUCTURE_START } from '../actions/types';

// watcher
export function* structureSaga() {
  yield takeEvery(STRUCTURE_START, structureWorker);
}

export function* structureWorker(action) {
  try {
    // console.log('content worker, viewName ->', action.payload)
    if (axiosClient.defaults.headers.common['Authorization'] === undefined) {
      return;
    }
    const result = yield getViewStructure(action.payload);
    // console.log('structureWorker, viewStructure ->', result.data.payload);
    const viewStructures = result.data.payload;
    console.log('structureWorker, viewStructures ->', viewStructures);
    yield viewStructures
  } catch (error) {
    console.log('content worker, error', error);
  }
}
