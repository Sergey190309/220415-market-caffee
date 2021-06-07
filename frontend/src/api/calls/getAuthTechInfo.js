import {techAxiosClient} from '../apiClient'

export const lngsCall = () => {
  try {
    const resp = techAxiosClient.get('/global/locales')
    return resp
  } catch (error) {
    console.log('logInCall error\n', error);
    throw error;
  }
}

export const techInCall = techInData => {
  try {
    const resp = techAxiosClient.post('/home/tech/auth', techInData);
    // console.log('techInCall, resp ->', resp)
    return resp;
  } catch (error) {
    console.log('logInCall error\n', error);
    throw error;
  }
};

export const logInCall = logInData => {
  try {
    // console.log('saga logInCall ->', logInData);
    const resp = techAxiosClient.post('/users/login', logInData);
    return resp;
  } catch (error) {
    console.log('logInCall error\n', error);
    throw error;
  }
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
