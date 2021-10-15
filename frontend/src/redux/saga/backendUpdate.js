import { call, put, takeEvery, select } from 'redux-saga/effects'

import {
  backendAddElementStart,
  backendAddElementSuccess,
  backendRemoveElementStart,
  backendRemoveElementSuccess,
  backendTxtUpdateStart,
  backendTxtUpdateSuccess,
  backendUpdateSelector,
  startAlert,
  openModal,
  structureStart
} from '../slices'

import {
  putTextContent, putAddElement,
  patchRemoveElement
} from '../../api/calls/content'
import { setAlertData } from '../../utils/utils'

function * elementsArgs (action) {
  /**
   * It checks whether no payload awailable if so it gives
   * arguments from state.
   */
  // console.log('backendUpdate(saga):\n elementsArgs',
  //   '\n  action ->', action)
  let values
  if (typeof action.payload === 'undefined') {
    const stateContent = yield select(backendUpdateSelector)
    const { kind, loading, loaded, ...stateValues } = stateContent
    values = stateValues.values
  } else {
    values = action.payload
  }
  const { identity, index, ...others } = values
  // const json = { ...others, block_id: identity, item_index: index }
  // console.log('saga, backendUpdate:\n elementsArgs',
  //   '\n  others ->', others)
  return { ...others, block_id: identity, item_index: index }
}

function * initConfirmPassword (error) {
  // console.log('saga, backendUpdate:\n initConfirmPassword\n  error ->', error)
  if (error.response.status === 401 && error.response.data.error === 'token_expired') {
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
    return true
  } else {
    return false
  }
}

export function * addElementSaga () {
  yield takeEvery(backendAddElementStart.type, backendAddElement)
}

export function * backendAddElement (action) {
  // console.log('saga, backendUpdate:\n backendAddElement',
  //   '\n  action ->', action
  // )
  /**
   * get args from state if not in payload.
   */
  const json = yield call(elementsArgs, action)

  try {
    const resp = yield call(putAddElement, json)
    // console.log('saga, backendUpdate:\n',
    //   ' backendAddElement\n  resp ->', resp)
    yield put(structureStart())
    yield put(backendAddElementSuccess())
    yield put(
      startAlert(
        setAlertData({
          message: resp.data.message,
          alertType: 'info',
          timeout: 5000
        })
      )
    )
  } catch (error) {
    // console.log('saga, backendUpdate:\n backendAddElement',
    //   '\n  error ->', error
    // )
    if (yield call(initConfirmPassword, error)) {
      return
    }
    if (error.response) {
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

export function * removeElementSaga () {
  yield takeEvery(backendRemoveElementStart.type, backendRemoveElement)
}

export function * backendRemoveElement (action) {
  const json = yield call(elementsArgs, action)
  // let values
  // if (typeof action.payload === 'undefined') {
  //   const stateContent = yield select(backendUpdateSelector)
  //   const { kind, loading, loaded, ...stateValues } = stateContent
  //   values = stateValues.values
  // } else {
  //   values = action.payload
  // }
  // // console.log('saga, backendUpdate:\n',
  // //   ' backendRemoveElement\n  values ->', values)
  // const { identity, index, ...others } = values
  // const json = { ...others, block_id: identity, item_index: index }
  try {
    const resp = yield call(patchRemoveElement, json)
    // console.log('saga, backendUpdate:\n backendRemoveElement\n',
    //   '  resp.data.message ->', resp.data.message)
    yield put(structureStart())
    yield put(backendRemoveElementSuccess())
    yield put(
      startAlert(
        setAlertData({
          message: resp.data.message,
          alertType: 'info',
          timeout: 5000
        })
      )
    )
  } catch (error) {
    if (yield call(initConfirmPassword, error)) {
      return
    }
    if (error.response) {
      // if (error.response.status === 401 && error.response.data.error === 'token_expired') {
      //   // console.log('saga, backendUpdate.error, description ->', error.response.data.description)
      //   yield put(openModal('confirmPassword'))
      //   yield put(
      //     startAlert(
      //       setAlertData({
      //         message: error.response.data.description,
      //         alertType: 'error',
      //         timeout: 5000
      //       })
      //     )
      //   )
      //   // confirmPasswordHelper(error.response.data.description, payload)
      //   return
      // }
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

export function * putTextSaga () {
  yield takeEvery(backendTxtUpdateStart.type, backendTextUpdate)
}

export function * backendTextUpdate (action) {
  let values
  if (typeof action.payload === 'undefined') {
    const stateContent = yield select(backendUpdateSelector)
    const { kind, loading, loaded, ...stateValues } = stateContent
    const { index, ..._values } = stateValues.values
    values = _values
  } else {
    values = action.payload
  }
  // console.log('saga, backendUpdate:\n backendTextUpdate',
  //   '\n  values.content ->', values.content)
  const { content, ...others } = values
  const json = {
    ...others,
    title: content.title,
    content: content.content ? content.content.join('<br>') : ''
  }
  try {
    const resp = yield call(putTextContent, json)
    yield put(backendTxtUpdateSuccess())
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
    if (yield call(initConfirmPassword, error)) {
      return
    }
    if (error.response) {
      console.log('contentSaga, error.response! ->')
      console.log(error.response.data.error)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log('contentSaga, error.request ->', error.request)
    } else {
      console.log('Error', error.message)
    }
  }
}
