import axiosClient from '../apiClient';
import { respErrorHandler } from '../../utils/respErrorHandler';
import uuid from 'uuid'

// export const getTecToken = async sessionId => {
//   console.log('getTecToken, uuid ->', uuid())
// }

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
    // console.log('resp.date.message ->', resp.data.payload.identity)
    return Promise.resolve(
      {
        identity: resp.data.payload.identity,
        title: resp.data.payload.title ? resp.data.payload.title : null,
        content: resp.data.payload.content ? resp.data.payload.content : null,
      }
    )
    // console.log('getContents, result ->', result);
    // return result;
  } catch (error) {
    respErrorHandler(error);
    return error;
  }
};
