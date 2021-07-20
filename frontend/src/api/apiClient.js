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
  baseURL: baseURL,
  headers: headers,
});

export const authAxiosClient = axios.create({
  baseURL: baseURL,
  headers: headers,
});

export const axiosCommonLng = lng => {
  techAxiosClient.defaults.headers.common['Accept-Language'] = lng;
  authAxiosClient.defaults.headers.common['Accept-Language'] = lng;
};

export const axiosCommonToken = (token, axiosInstance = techAxiosClient) => {
  // console.log('axiosCommonToken, headers ->', axiosInstance.defaults.headers.common['Authorization'])
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// export default axiosClient;
