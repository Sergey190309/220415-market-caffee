import axios from 'axios';
// import i18next from 'i18next';

const baseURL = 'http://127.0.0.1:5000'
const headers = {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    common: {
      // 'Accept-Language': 'ru'
      'Accept-Language': 'en'
    }
}

export const techAxiosClient = axios.create({
  /**
   * used for tech initial update - tech token, sessions, etc.
   */
  baseURL: baseURL,
  headers: headers,
});

export const pixAxiosClient = axios.create({
  /**
   * user for operations with pictures
   */
  baseURL: baseURL,
  headers: {
    ...headers,
    'Content-Type': 'multipart/form-data',

    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X- Request-With'
  },
  responseType: 'arraybuffer',
  responseEncoding: 'binary',
})

export const authAxiosClient = axios.create({
  /**
   * used for authorisation
   */
  baseURL: baseURL,
  headers: headers,
});

export const axiosCommonLng = lng => {
  // console.log('apiClient, axiosCommonLng, lng ->', lng)
  techAxiosClient.defaults.headers.common['Accept-Language'] = lng;
  pixAxiosClient.defaults.headers.common['Accept-Language'] = lng;
  authAxiosClient.defaults.headers.common['Accept-Language'] = lng;
};

export const axiosCommonToken = (token, axiosInstance = techAxiosClient) => {
  // console.log('axiosCommonToken, headers ->', axiosInstance.defaults.headers.common['Authorization'])
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  pixAxiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// export default axiosClient;
