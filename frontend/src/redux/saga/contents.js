import { call, put, takeEvery } from 'redux-saga/effects';

import { CONTENTS_START } from "../actions/types";

// watcher
export function* contentsSaga() {
  yield takeEvery(CONTENTS_START, contentsWorker)
}

export function* contentsWorker(action) {
  try {
    yield console.log('content worker, viewName ->', action.payload)
  } catch (error) {
    console.log('content worker, error', error)
  }
}