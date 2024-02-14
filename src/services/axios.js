import axios from 'axios';
import config from '../config';
import Cookies from 'js-cookie';

axios.defaults.baseURL = config.BASE_URL; //BASE URL

axios.interceptors.request.use(function (axios_config) {
  axios_config.headers.authorization = Cookies.get('token');
  return axios_config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axios