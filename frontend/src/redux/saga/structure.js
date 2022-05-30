import { call, put, takeEvery } from 'redux-saga/effects'
// import { call, put, takeEvery } from 'redux-saga/effects';
import { techTextAxiosClient } from '../../api/apiClient'
import { getViewStructure } from '../../api/calls/getViewsStructure'

// import { structureSuccess } from '../actions';
// import { STRUCTURE_START } from '../constants/type_s';
import { structureStart, structureSuccess } from '../slices/structure'

// Watcher
export function* structureSaga() {
  // console.log('structureSaga,',
  //   '\n  structureStart.type ->', structureStart.type)
  yield takeEvery(structureStart.type, structureWorker)
}

// Worker
export function* structureWorker() {
  // console.log('structureWorker, techTextAxiosClient.defaults.headers.common.Authorization ->', techTextAxiosClient.defaults.headers.common.Authorization)
  try {
    /**
     * Do nothing if no authorisation token available.
     */
    if (techTextAxiosClient.defaults.headers.common.Authorization === undefined) {
      // console.log('no authorisation')
      return
    }
    const result = yield call(getViewStructure)
    console.log('structureWorker:', '\n result ->', result.data.payload)
    const viewStructures = result.data.payload.map(sturcture => ({
      [sturcture.view_id]: sturcture.attributes
    }))
    // console.log('structureWorker:',
    //   '\n viewStructures ->', viewStructures)
    yield put(structureSuccess(viewStructures))
  } catch (error) {
    console.log('content worker, error', error)
  }
}
