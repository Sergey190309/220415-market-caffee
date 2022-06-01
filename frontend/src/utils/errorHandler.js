
export const actRespErrorMessage = error => {
  // console.log('utils>errorHandler>actRespErrorMessage, error ->', error)
  if (error.response) {
    return `${error.name}. ${error.message}`
  } else {
    return error.message
  }
}

// export function sagaErrorHandler(error) {
export function* sagaErrorHandler(error) {
  if (error.response) {
    // yield put(
    //   startAlert({
    //     message: actRespErrorMessage(error),
    //     alertType: 'error',
    //     timeout: 5000
    //   })
    // )
    console.log('sagaErrorHandler, error.response ->',
    actRespErrorMessage(error))
  } else if (error.request) {
    // yield put(
    //   startAlert({
    //     message: error.message,
    //     alertType: 'error',
    //     timeout: 5000
    //   })
    // )
    console.log('sagaErrorHandler, error.request ->', error.request)
  } else {
    // console.log('Error ->', error.message)
  }
}
