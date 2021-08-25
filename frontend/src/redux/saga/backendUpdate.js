import { call, put, takeEvery } from 'redux-saga/effects'

import {
  backendUpdateStart,
  backendUpdateSuccess,
  // backendUpdateFail,
  // backendUpdateSelector,
  startAlert,
  openModal
} from '../slices'

import { putTextContent } from '../../api/calls/content'
import { setAlertData } from '../../utils/utils'
// import { actRespErrorMessage } from '../../utils/errorHandler'

export function * putTextSaga () {
  yield takeEvery(backendUpdateStart.type, backendTextUpdate)
}

export function * backendTextUpdate (action) {
  // console.log('saga, backendUpdate, action ->', action.payload)
  const { content, ...others } = action.payload
  // console.log('saga, backendUpdate, content ->', content)
  const json = {
    ...others,
    title: content.title,
    content: content.content ? content.content.join('<br>') : ''
  }
  try {
    const resp = yield call(putTextContent, json)
    // console.log('saga, backendUpdate, resp ->', resp.data.message)
    yield put(backendUpdateSuccess())
    yield put(
      startAlert(
        setAlertData({
          message: resp.data.message,
          alertType: 'info',
          timeout: 3000
        })
      )
    )
  } catch (error) {
    // console.log('saga, backendUpdate, error ->', error)
    if (error.response) {
      if (error.response.status === 401 && error.response.data.error === 'token_expired') {
        // console.log(error.response.data.description)
        yield put(openModal('confirmPassword'))
        yield put(
          startAlert(
            setAlertData({
              message: error.response.data.description,
              alertType: 'error',
              timeout: 5000
            })
          )
        )
        // confirmPasswordHelper(error.response.data.description, payload)
        return
      }
      console.log('contentSaga, error.response! ->')
      console.log(error.response.data.error)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log('contentSaga, error.request ->', error.request)
    } else {
      // console.log('Error', error.message)
    }
  }
}
