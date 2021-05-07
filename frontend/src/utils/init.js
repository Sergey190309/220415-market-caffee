import { getTecToken } from '../api/calls/getBackEndInfo';

// const tec_token = async () => await getTecToken();

getTecToken()
  .then(resp => console.log('init getTecToken ->', resp))
  .catch(error => console.error(error))
