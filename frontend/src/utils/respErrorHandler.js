// import { alertActions } from '../redux/actions/alert';

export const actRespErrorHandler = (error) => {
  // console.log('actRespErrorHandler -', error)

  if (error.response) {
    return `${error.response.data.message} ${error.response.status}`
  } else {
    return error.message
  }
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
