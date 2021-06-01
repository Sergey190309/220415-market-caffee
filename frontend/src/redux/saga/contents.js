import { call, put, takeEvery } from 'redux-saga/effects';
import axiosClient from '../../api/apiClient'
import {getViewStructure} from '../../api/calls/getViewsContents'

import { CONTENTS_START } from "../actions/types";

// watcher
export function* contentsSaga() {
  yield takeEvery(CONTENTS_START, contentsWorker)
}

export function* contentsWorker(action) {
  try {
    // console.log('content worker, viewName ->', action.payload)
    if (axiosClient.defaults.headers.common['Authorization'] === undefined) {
      return
    }
    const result = yield getViewStructure(action.payload)
    const viewStructure = result.data.payload.attributes
    console.log('content worker, viewStructure ->', viewStructure)
  } catch (error) {
    console.log('content worker, error', error)
  }
}