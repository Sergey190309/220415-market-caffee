import {
  refreshTokenAxiosClient,
  authTextAxiosClient,
  techTextAxiosClient
} from '../apiClient'
// import { apiCallsErrorHandler } from '../../utils/errorHandler';

export const techInCall = techInData => {
  // console.log('techInCall, techInData ->', techInData,
  //   '\n  techTextAxiosClient ->', techTextAxiosClient
  // )
  const resp = techTextAxiosClient.get('/home/tech/auth', { params: techInData })
  return resp
}

export const lngsCall = () => {
  const resp = techTextAxiosClient.get('/global/locales')
  // console.log('getAuthTechInfo>lngsCall, resp ->', await resp)
  return resp
}

export const confirmPasswordCall = passwordData => {
  // console.log('confirmPasswordCall, passwordData ->', passwordData)
  const resp = refreshTokenAxiosClient.put('/users/login', passwordData)
  return resp
}



export const logInCall = logInData => {
  console.log('teckAuthTechInfo>logInCall, logInData ->', logInData)
  const resp = authTextAxiosClient.post('/users/login', logInData)
  console.log('teckAuthTechInfo>logInCall, resp ->', resp)
  return resp
}

export const signUpCall = signUpData => {
  console.log('teckAuthTechInfo>signUpCall signUpData ->', signUpData);
  const resp = authTextAxiosClient.post('/users', signUpData)
  return resp
}
