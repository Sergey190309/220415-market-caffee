import { techAxiosClient } from '../apiClient';
// import { apiCallsErrorHandler } from '../../utils/errorHandler';

export const lngsCall = () => {
  try {
    const resp = techAxiosClient.get('/global/locales');
    return resp;
  } catch (error) {
    console.log('logInCall error\n', error);
    throw error;
  }
};

export const techInCall = techInData => {
  // console.log('techInCall, techInData ->', techInData);
  // techInData = '';
  // const resp = techAxiosClient.post('/home/tech/auth');
  const resp = techAxiosClient.post('/home/tech/auth', techInData);
  return resp;
};

export const logInCall = logInData => {
  const resp = techAxiosClient.post('/users/login', logInData);
  return resp;
};

export const signUpCall = signUpData => {
  try {
    // console.log('saga signUpCall ->', signUpData);
    const resp = techAxiosClient.post('/users', signUpData);
    return resp;
  } catch (error) {
    console.log('signUpCall error\n', error);
    throw error;
  }
};
