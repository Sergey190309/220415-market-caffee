import { authTextAxiosClient, techTextAxiosClient } from '../apiClient'
// import { apiCallsErrorHandler } from '../../utils/errorHandler';

export const lngsCall = () => {
  const resp = techTextAxiosClient.get('/global/locales')
  return resp
}

export const techInCall = techInData => {
  // console.log('techInCall, techInData ->', techInData)
  const resp = techTextAxiosClient.get('/home/tech/auth', { params: techInData })
  return resp
}

export const logInCall = logInData => {
  console.log('logInCall, logInData ->', logInData)
  const resp = authTextAxiosClient.post('/users/login', logInData)
  // console.log('logInCall, resp ->', resp)
  return resp
}

export const signUpCall = signUpData => {
  // console.log('saga signUpCall ->', signUpData);
  const resp = authTextAxiosClient.post('/users', signUpData)
  return resp
}
