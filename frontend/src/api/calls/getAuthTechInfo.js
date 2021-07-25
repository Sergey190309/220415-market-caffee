import { techAxiosClient, authAxiosClient } from '../apiClient';
// import { apiCallsErrorHandler } from '../../utils/errorHandler';

export const lngsCall = () => {
  const resp = techAxiosClient.get('/global/locales');
  return resp;
};

export const techInCall = techInData => {
  // techInData = '';
  // const resp = techAxiosClient.post('/home/tech/auth');
  const resp = techAxiosClient.post('/home/tech/auth', techInData);
  // console.log('techInCall, resp ->', resp);
  return resp;
};

export const logInCall = logInData => {
  const resp = authAxiosClient.post('/users/login', logInData);
  console.log('logInCall, resp ->', resp)
  return resp;
};

export const signUpCall = signUpData => {
  try {
    // console.log('saga signUpCall ->', signUpData);
    const resp = authAxiosClient.post('/users', signUpData);
    return resp;
  } catch (error) {
    // console.log('signUpCall error\n', error);
    throw error;
  }
};
