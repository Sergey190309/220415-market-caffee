import { take, call } from 'redux-saga/effects';
// import { useSaga } from './createIO';
import { getViewContent } from '../../../api/calls/getViewContent';
import {CONTENT_REQUESTED} from '../../constants/contentLoading/types'

export const contentSaga = function* (setter) {
  while (true) {
    const { payload } = yield take(CONTENT_REQUESTED);
    // console.log('contentSaga, params ->', params);
    try {
      const result = yield call(getViewContent, payload);
      const { title, content } = result.data.payload;
      yield call(setter, {
        title: title,
        content: content,
      });
    } catch (error) {
      if (error.response) {
        console.log('contentSaga, error.response ->')
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log('contentSaga, error.request ->', error.request)
      } else {
        console.log('Error', error.message);
      }
    }
  }
};
