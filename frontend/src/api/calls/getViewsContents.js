import axiosClient from '../apiClient';
import { respErrorHandler } from '../../utils/respErrorHandler';
import { v4 } from 'uuid';

export const getLngList = async (tech_token) => {
  try {
    // console.log('getLngList axios->', axiosClient.defaults.headers.common)
    const resp = await axiosClient.get('/global/locales')
    const result = resp.data.payload.map(item => item.id)
    // console.log('getLngList axios->', result)
    return result
  } catch (error) {
    respErrorHandler(error);
    return error;
  }
}

export const getTechToken = async (sessionId = v4()) => {
  try {
    // const sessionId = v4()
    const resp = await axiosClient.post('/home/tech/auth', { "tech_id": sessionId })
    // console.log('getTechToken, resp ->', resp)
    return {techToken: resp.data.payload? resp.data.payload: null}
  } catch (error) {
  respErrorHandler(error);
  return error;
  }
};

// export const getLocales = async sessionId => {
//   console.log(getLocales)
// }

export const getContents = async keys => {
  // keys structure:
  // {
  //   identity: '',
  //   view_id: '',
  // }
  try {
    const resp = await axiosClient.get('/contents', { params: keys });
    // console.log('resp.date.message ->', resp)
    // console.log('resp.date.message ->', resp.data.payload.identity)
    return Promise.resolve({
      identity: resp.data.payload.identity,
      title: resp.data.payload.title ? resp.data.payload.title : null,
      content: resp.data.payload.content ? resp.data.payload.content : null,
    });
    // console.log('getContents, result ->', result);
    // return result;
  } catch (error) {
    respErrorHandler(error);
    return error;
  }
};
