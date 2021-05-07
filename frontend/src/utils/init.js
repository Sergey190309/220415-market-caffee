import { getTechToken } from '../api/calls/getBackEndInfo';

// const tec_token = async () => await getTecToken();

getTechToken()
  .then(resp => console.log('init getTecToken ->', resp))
  .catch(error => console.error(error))

// export const