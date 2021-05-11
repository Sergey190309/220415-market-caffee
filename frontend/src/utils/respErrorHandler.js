import { setAlert } from '../redux/actions/alert';

export const actRespErrorHandler = (error, dispatch, actionType) => {
  // console.log('actRespErrorHandler -', error)
  if (error.response) {
    dispatch(setAlert(error.response.data.message, 'error'));
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
  } else if (error.request) {
    // console.log(error.request)
    console.log('actRespErrorHandler, error ->', error.message)
    dispatch(setAlert(error.message, 'error', 5000));
  } else {
    dispatch(setAlert(error.message, 'error'));
    // console.log('respErrorHandler', error.request);
  }
  // console.log(error.config)
  dispatch({
    type: actionType,
  });
};

export const respErrorHandler = (error) => {
  // if (error.response) {
  //   console.log('error.response.data ->', error.response.data);
  //   console.log('error.response.status ->', error.response.status);
  //   console.log('error.response.headers ->', error.response.headers);
  // } else if (error.request) {
  //   console.log('error.request ->', error.request)
  // } else {
  //   console.log('error.message ->', error.message);
  // }
  // console.log('error.config ->', error.config)
}
