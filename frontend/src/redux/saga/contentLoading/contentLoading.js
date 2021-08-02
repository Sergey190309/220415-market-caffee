import { take, call } from 'redux-saga/effects';
// import { useSaga } from './createIO';
import { getViewContent, getViewPicture } from '../../../api/calls/getViewContent';
import {CONTENT_REQUESTED, PICTURE_REQUESTED} from '../../constants/types'

export const contentSaga = function* (setter) {
  while (true) {
    const { payload } = yield take(CONTENT_REQUESTED);
    // console.log('contentSaga, params ->', payload);
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

export const picturetSaga = function* (setter) {
  while (true) {
    const { payload } = yield take(PICTURE_REQUESTED);
    // console.log('contentSaga, params ->', payload);
    try {
      // const result = yield call(getViewPicture, payload);
      const texts = yield call(getViewContent, payload);
      const { title, content } = texts.data.payload;
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
