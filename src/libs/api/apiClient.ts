import axios, {AxiosError} from 'axios';
import {Cookies} from 'react-cookie';
import Configs from 'config';
import {handleHTTPError} from 'libs/api/errorHandle';

export const CCSRFToken = 'womenlink_csrftoken';
export const cookies = new Cookies();
export const host = Configs.API_HOST;
const apiClient = axios.create({
  baseURL: host,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': cookies.get(CCSRFToken),
  },
  responseType: 'json',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    return handleHTTPError(error as AxiosError);
  },
);

export default apiClient;
