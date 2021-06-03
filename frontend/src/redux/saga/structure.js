import { call, put, takeEvery } from 'redux-saga/effects';
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
export function* structureWorker(
  action,
  auth = axiosClient.defaults.headers.common['Authorization']
) {
  console.log('structureWorker, action.payload ->', action[1]);
  console.log('structureWorker, auth ->', auth);
  try {
    if (auth === undefined) {
      console.log('structureWorker, viewName');
      return;
    }
    const result = yield call(getViewStructure, action.payload);
    // console.log('structureWorker, viewStructure ->', result.data.payload);
    const viewStructures = result.data.payload.map(sturcture => {
      return { [sturcture['view_id']]: sturcture['attributes'] };
    });
    // console.log('structureWorker, viewStructures ->', viewStructures);
    yield put(structureSuccess(viewStructures));
  } catch (error) {
    console.log('content worker, error', error);
  }
}
