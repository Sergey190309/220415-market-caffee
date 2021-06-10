import { alertActions } from '../redux/actions/alert';
// import { call } from 'redux-saga/effects';
import store from '../redux/store'


export const actRespErrorMessage = (error) => {
  // console.log('actRespErrorHandler -', error)

  if (error.response) {
    return `${error.response.data.message} ${error.response.status}`
  } else {
    return error.message
  }
};

export const sagaErrorHandler = (error) => {
  console.log('sagaErrorHandler, type ->', typeof(error));

  if (error.response) {
    console.log('sagaErrorHandler, error.response ->');
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    store.dispatch(
      alertActions({
        message: error.message,
        alertType: 'error',
        timeout: 5000
      })
    )
    // console.log('sagaErrorHandler, error.request ->', error.request);
  } else {
    console.log('Error', error.message);
  }
}
