import { take, call } from 'redux-saga/effects'
// import { useSaga } from './createIO';
import { getViewContent, putViewContent, getViewPicture } from '../../../api/calls/content'
import { CONTENT_REQUESTED, CONTENT_PUT, PICTURE_REQUESTED } from '../../constants/types'

export const putContentSaga = function * (setter) {
  while (true) {
    const { payload } = yield take(CONTENT_PUT)
    try {
      const { content, ...otherProps } = payload
      const json = { ...otherProps, title: content.title, content: content.content.join('<br>') }
      // console.log('saga, content, putContentSaga, json ->', json)
      const result = yield call(putViewContent, json)
      console.log('saga, content, putContentSaga, result ->', result)
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

export const getContentSaga = function * (setter) {
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

export const getPicSaga = function * (setter) {
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