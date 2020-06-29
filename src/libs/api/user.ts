import {CancelTokenSource} from 'axios';
import {
  TListRequestParams,
  TListResponse,
} from 'modules/types';
import {
  TCreateUser,
  TUser,
  TUserLogin,
} from 'modules/user';
import apiClient from 'libs/api/apiClient';

/**
 * User
 */

export const createUser = (params: TCreateUser, cancel?: CancelTokenSource) => {
  return apiClient.post('/user/create', params, {
    cancelToken: cancel?.token,
  });
};

export const getUser = () => {
  return apiClient.get<TUser>(`/user`);
};

/**
 * Authentication
 */

export const userLogin = (params: TUserLogin, cancel?: CancelTokenSource) => {
  return apiClient.post('/user/login', params, {
    cancelToken: cancel?.token,
  });
};

export const userLogout = () => apiClient.post('/user/logout');
