import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {
  TSocietyAboutDetail,
  TCreateSocietyAboutDetail,
  TUpdateSocietyAboutDetail,
} from 'modules/society';
import apiClient from 'libs/api/apiClient';

export const getSocietyAbout = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TSocietyAboutDetail>(`/society/about/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createSocietyAbout = (params: TCreateSocietyAboutDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/society/about', params, {
    cancelToken: cancel?.token,
  });
};

export const updateSocietyAbout = (id?: number, params?: TUpdateSocietyAboutDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/society/about/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteSocietyAbout = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/society/about/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getSocietyAbouts = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TSocietyAboutDetail>>(`/society/abouts`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

