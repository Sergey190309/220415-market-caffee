import { alertActions } from '../redux/actions/na_alert';
import { put } from 'redux-saga/effects';
// import { call } from 'redux-saga/effects';
// import store from '../redux/store'

export const apiCallsErrorHandler = error => {
  if (error.response) {
    console.log('sagaErrorHandler, error.response ->');
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // store.dispatch(
    //   alertActions({
    //     message: error.message,
    //     alertType: 'error',
    //     timeout: 5000
    //   })
    // )
    console.log('sagaErrorHandler, error.request ->', error.request);
  } else {
    console.log('Error ->', error.message);
  }
}

export const actRespErrorMessage = (error) => {
  // console.log('actRespErrorHandler -', error)

  if (error.response) {
    return `${error.response.data.message} ${error.response.status}`
  } else {
    return error.message
  }
};

export function* sagaErrorHandler(error) {
  if (error.response) {
    yield put(
      alertActions({
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
      alertActions({
        message: error.message,
        alertType: 'error',
        timeout: 5000
      })
    )
    // store.dispatch(
    //   alertActions({
    //     message: error.message,
    //     alertType: 'error',
    //     timeout: 5000
    //   })
    // )
    // console.log('sagaErrorHandler, error.request ->', error.request);
  } else {
    // console.log('Error ->', error.message);
  }

}
// export const sagaErrorHandler = (error) => {
// }
