import axios from 'axios';

const setAuthToken = access_token => {
  if (access_token) {
    axios.defaults.headers.common['x-auth-token'] = access_token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
