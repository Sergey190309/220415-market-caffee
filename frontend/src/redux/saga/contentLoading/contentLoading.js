import { take, call } from 'redux-saga/effects';
// import { useSaga } from './createIO';
import { getViewContent } from '../../../api/calls/getViewContent';
import {CONTENT_REQUESTED} from '../../actions/contentLoading/types'

export const contentSaga = function* (setter) {
  while (true) {
    const { payload } = yield take(CONTENT_REQUESTED);
    // console.log('contentSaga, params ->', params);
    const result = yield call(getViewContent, payload);
    const { title, content } = result.data.payload;
    yield call(setter, {
      title: title,
      content: content,
    });
  }
};
