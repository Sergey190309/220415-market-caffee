import { take, call } from 'redux-saga/effects'
// import { useSaga } from './createIO';
import { getViewContent, getViewPicture } from '../../../api/calls/getViewContent'
import { CONTENT_REQUESTED, PICTURE_REQUESTED } from '../../constants/types'

export const contentSaga = function * (setter) {
  while (true) {
    const { payload } = yield take(CONTENT_REQUESTED)
    try {
      // console.log('contentSaga,  payload ->', payload)
      const result = yield call(getViewContent, payload)
      const { title, content } = result.data.payload
      const contentArr = (content ? content.split('<br>') : [])
      yield call(setter, {
        title: title,
        content: contentArr
      })
    } catch (error) {
      if (error.response) {
        console.log('contentSaga, error.response ->')
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log('contentSaga, error.request ->', error.request)
      } else {
        console.log('Error', error.message)
      }
    }
  }
}

export const picSaga = function * (setter) {
  while (true) {
    const { payload } = yield take(PICTURE_REQUESTED)
    try {
      // console.log('picSaga, payload ->', payload)
      const pixResp = yield call(getViewPicture, payload)
      // console.log('picSaga, pixResp ->', pixResp.data)
      yield call(setter, {
        pic: Buffer.from(pixResp.data, 'binary').toString('base64')
      })
    } catch (error) {
      if (error.response) {
        console.log('contentSaga, error.response ->')
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log('contentSaga, error.request ->', error.request)
      } else {
        console.log('Error', error.message)
      }
    }
  }
}
