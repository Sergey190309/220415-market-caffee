import axiosClient from './apiClient'


export const axiosCommonLng = lng => {
  axiosClient.defaults.headers.common['Accept-Language'] = lng;
};

export const axiosCommonToken = token => {
  // console.log('axiosCommonToken, token ->', token)
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
