import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {TBanner, TDonation, TCalendar, TInformationHistory} from 'modules/information';
import apiClient from 'libs/api/apiClient';

/**
 * 메인화면 배너
 */

export const getBanners = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBanner>>(`/information/banners`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 후원금
 */

export const createDonation = (params: TDonation, cancel?: CancelTokenSource) => {
  return apiClient.post('/information/donation', params, {
    cancelToken: cancel?.token,
  });
};

export const getDonations = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TDonation>>(`/information/donations`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 일정표
 */

export const getCalendarsAll = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TCalendar>>(`/information/calendars/all`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

export const getCalendars = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TCalendar>>(`/information/calendars`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 연혁
 */
export const getAffiliateHistories = (cancel?: CancelTokenSource) => {
  return apiClient.get<TInformationHistory>(`/information/affiliate/histories`, {
    cancelToken: cancel?.token,
  });
};

export const getMainHistories = (cancel?: CancelTokenSource) => {
  return apiClient.get<TInformationHistory>(`/information/main/histories`, {
    cancelToken: cancel?.token,
  });
};
