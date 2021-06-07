import { take, call } from 'redux-saga/effects';
// import { useSaga } from './createIO';
import { getViewContent } from '../../../api/calls/getViewContent';
import {CONTENT_REQUESTED} from '../../actions/contentLoading/types'

// const fakeContentLoading = url => {
//   return 'samthing ->' + url;
// };

export const contentSaga = function* (setter) {
  while (true) {
    const { payload } = yield take(CONTENT_REQUESTED);
    // console.log('contentSaga, params ->', params);
    const result = yield call(getViewContent, payload);
    // console.log('contentSaga, result ->', result.data.payload);
    const { title, content } = result.data.payload;
    yield call(setter, {
      title: title,
      content: content,
    });
  }
};
