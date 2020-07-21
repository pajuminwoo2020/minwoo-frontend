import {CancelTokenSource} from 'axios';
import {
  TListRequestParams,
  TListResponse,
} from 'modules/types';
import {
  TCreateUser,
  TUser,
  TUserLogin,
  TUserCreate,
  TPasswordReset,
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

export const passwordReset = (params: TPasswordReset) => {
  return apiClient.post(`/password/reset`, params);
  //return apiClient.post(`password_reset/`, params);
};

export const main = () => wrapPromise(
  apiClient.get<TUser>('/user').then(
    async response => {
      return response.data;
    },
    e => {
      return e;
    },
  ),
);

function wrapPromise(promise: any) {
  let status = 'pending';
  let result: any;
  let suspender = promise.then(
    (r: any) => {
      status = 'success';
      result = r;
    },
    (e: any) => {
      status = 'error';
      result = e;
    },
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

/**
 * Authentication
 */

export const userLogin = (params: TUserLogin, cancel?: CancelTokenSource) => {
  return apiClient.post('/user/login', params, {
    cancelToken: cancel?.token,
  });
};

export const userCreate = (params: TUserCreate, cancel?: CancelTokenSource) => {
  return apiClient.post('/user/create', params, {
    cancelToken: cancel?.token,
  });
};

export const userLogout = () => apiClient.post('/user/logout');



export const userActivate = (uidb64: string, token: string) => {
  return apiClient.get(`/user/activate/${uidb64}/${token}`);
};