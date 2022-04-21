import { startAlert } from '../redux/slices'
import { put } from 'redux-saga/effects'

export const apiCallsErrorHandler = error => {
  if (error.response) {
    console.log('sagaErrorHandler, error.response ->')
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    console.log('sagaErrorHandler, error.request ->', error.request)
  } else {
    console.log('Error ->', error.message)
  }
}

// export const functionName = (params) => {

// }

export const actRespErrorMessage = error => {
  console.log('utils errorHandler, actRespErrorMessage, error ->', error)
  console.log('utils errorHandler, actRespErrorMessage, error.response ->', error.response)
  if (error.response) {
    return `${error.response.data.message} ${error.response.status}`
  } else {
    return error.message
  }
}

export function * sagaErrorHandler (error) {
  if (error.response) {
    yield put(
      startAlert({
        message: actRespErrorMessage(error),
        alertType: 'error',
        timeout: 5000
      })
    )
    // console.log('sagaErrorHandler, error.response ->');
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
  } else if (error.request) {
    yield put(
      startAlert({
        message: error.message,
        alertType: 'error',
        timeout: 5000
      })
    )
    // console.log('sagaErrorHandler, error.request ->', error.request);
  } else {
    // console.log('Error ->', error.message);
  }
}
