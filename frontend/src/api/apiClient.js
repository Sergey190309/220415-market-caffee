import axios from 'axios';
// import i18next from 'i18next';

export const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    common: {
      'Accept-Language': 'en'
    }
  },
});


export const axiosCommonLng = lng => {
  axiosClient.defaults.headers.common['Accept-Language'] = lng;
};

export const axiosCommonToken = token => {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default axiosClient;
