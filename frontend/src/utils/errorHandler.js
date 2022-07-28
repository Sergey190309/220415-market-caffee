// import {useAppDispatch} from '../hooks/reactRedux'
import store from '../redux/store'
import { startAlert } from '../redux/slices'

export const actRespErrorMessage = error => {
  console.log('utils>errorHandler>actRespErrorMessage, error.response ->', error.response.data.message)
  if (error.response) {
    return `${error.name}. ${error.message}`
  } else {
    return error.message
  }
}

// export function sagaErrorHandler(error) {
export const sagaErrorHandler = (error) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const dispatch = useAppDispatch()
  if (error.response) {
    store.dispatch(
      startAlert({
        message: error.response.data.message,
        // message: actRespErrorMessage(error),
        alertType: 'error',
        timeout: 5000
      })
    )
    // console.log('sagaErrorHandler, error.response ->',
    // actRespErrorMessage(error))
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
    console.log('Error ->', error.message)
  }
}
