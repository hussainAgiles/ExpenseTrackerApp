import axios from 'axios';
import * as APIENDPOINT from './Endpoints';

// Create axios client, pre-configured with baseURL
let API = axios.create({
  baseURL: APIENDPOINT.baseUrl,
  timeout: 1000000,
  validateStatus: status => {
    return status >= 200 && status <= 500;
  },
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    function (data, headers) {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    data => {
      return JSON.parse(data);
    },
  ],
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  API.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default API;
