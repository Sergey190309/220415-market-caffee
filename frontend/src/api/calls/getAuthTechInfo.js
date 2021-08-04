import { techAxiosClient, authAxiosClient } from '../apiClient'
// import { apiCallsErrorHandler } from '../../utils/errorHandler';

export const lngsCall = () => {
  const resp = techAxiosClient.get('/global/locales')
  return resp
}

export const techInCall = techInData => {
  // techInData = '';
  // const resp = techAxiosClient.post('/home/tech/auth');
  // console.log('techInCall, techInData ->', techInData);
  const resp = techAxiosClient.post('/home/tech/auth', techInData)
  return resp
}

export const logInCall = logInData => {
  const resp = authAxiosClient.post('/users/login', logInData)
  // console.log('logInCall, resp ->', resp)
  return resp
}

export const signUpCall = signUpData => {
  // console.log('saga signUpCall ->', signUpData);
  const resp = authAxiosClient.post('/users', signUpData)
  return resp
}
