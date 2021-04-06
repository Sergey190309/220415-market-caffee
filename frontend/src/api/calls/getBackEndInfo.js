import axiosClient from '../apiClient';
import { respErrorHandler } from '../../utils/respErrorHandler';

export const getContents = async keys => {
  try {
    const resp = await axiosClient.get('/contents', { params: keys });
    // console.log('resp.date.message ->', resp.data.message)
    // console.log('resp.date.payload ->', resp.data.payload)
    const result = {
      title: resp.data.payload.title ? resp.data.payload.title : null,
      content: resp.data.payload.content ? resp.data.payload.content : null,
    };
    // console.log('getContents, result ->', result);
    return result;
  } catch (error) {
    // console.log('error:', error);
    respErrorHandler(error);
  }
  // const json = {
  //   "identity": identity,
  //   "view_id": view_id,
  // }
  // return 'results'
};
