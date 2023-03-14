import axios from 'axios';
import { parse, stringify } from 'qs'

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  }
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;