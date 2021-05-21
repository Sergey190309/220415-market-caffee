import axiosClient from '../apiClient'

export const lngsCall = () => {
  const resp = axiosClient.get('/global/locales')
  return resp
}

export const techInCall = techInData => {
  const resp = axiosClient.post('/home/tech/auth', techInData);
  return resp;
};

export const logInCall = logInData => {
  try {
    // console.log('saga logInCall ->', logInData);
    const resp = axiosClient.post('/users/login', logInData);
    return resp;
  } catch (error) {
    console.log('logInCall error\n', error);
  }
};

export const signUpCall = signUpData => {
  try {
    // console.log('saga signUpCall ->', signUpData);
    const resp = axiosClient.post('/users', signUpData);
    return resp;
  } catch (error) {
    console.log('signUpCall error\n', error);
  }
};
