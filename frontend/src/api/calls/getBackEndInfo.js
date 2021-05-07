import axiosClient from '../apiClient';
import { respErrorHandler } from '../../utils/respErrorHandler';
import { v4 } from 'uuid';

export const getTecToken = async () => {
  try {
    const sessionId = v4()
    const resp = await axiosClient.post('/home/tec/auth', {"tec_id": sessionId})
    // const resp = await axiosClient.post('/global/locales', {"tec_id": sessionId})
    // console.log('getTecToken, resp ->', resp);
    return Promise.resolve({
      tec_token: resp.data.payload? resp.data.payload: null
    })
  } catch (error) {
    console.error(error);
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
