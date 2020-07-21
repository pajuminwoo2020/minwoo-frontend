import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {
  TPeople,
} from 'modules/people';
import apiClient from 'libs/api/apiClient';

export const getPeoples = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
    return apiClient.get<TListResponse<TPeople>>(`/intro/people`, {
      params: params,
      cancelToken: cancel?.token,
    });
  };