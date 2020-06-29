import {CancelTokenSource} from 'axios';
import {forIn, isArray, join, replace, set} from 'lodash';
import {TListRequestParams, TListResponse} from 'modules/types';
import apiClient from 'libs/api/apiClient';


export class CommonApi<T, TCreate = any, TUpdate = any, TDelete = any> {
  path = '';

  constructor(path: string) {
    this.path = path;
  }

  pluralize(path: string) {
    return /(ss)$/i.test(path) === true ? `${path}es` : `${path}s`;
  }

  getTableList = ({id, params}: TListRequestParams, cancel?: CancelTokenSource) => {
    return apiClient.get<TListResponse<T>>(`/${this.pluralize(this.path)}/${id}`, {
      params: params,
      cancelToken: cancel?.token,
    });
  };

  get = (id?: number, cancel?: CancelTokenSource) => {
    return apiClient.get<T>(`/${this.path}/${id}`, {
      cancelToken: cancel?.token,
    });
  };

  create = (params: TCreate, cancel?: CancelTokenSource) => {
    return apiClient.post(`/${this.path}`, params, {
      cancelToken: cancel?.token,
    });
  };

  update = (id?: number, params?: TUpdate, cancel?: CancelTokenSource) => {
    return apiClient.put(`/${this.path}/${id}`, params, {
      cancelToken: cancel?.token,
    });
  };

  delete = (id?: number, cancel?: CancelTokenSource) => {
    return apiClient.delete(`/${this.path}/${id}`, {
      cancelToken: cancel?.token,
    });
  };
}

export function paramsResolver<T extends Record<string, any>>(params: T) {
  forIn(params, (value, key) => {
    if (isArray(value) === true) {
      set(params, key, join(value, ','));
    }
  });

  return params;
}
