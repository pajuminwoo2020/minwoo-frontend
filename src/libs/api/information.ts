import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {
  TBanner,
  TDonation,
  TCalendar,
  TInformationHistory,
  TSocietyAboutDetail,
  TPeople,
  TInformation,
  TAbout,
  TClinicAbout,
  TDonationPage,
} from 'modules/information';
import apiClient from 'libs/api/apiClient';

/**
 * 회사 정보
 */

export const getInformation = () => {
  return apiClient.get<TInformation>(`/information`);
}


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

export const createDonation = (params: FormData, cancel?: CancelTokenSource) => {
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

// 후원하기 소개글
export const getDonationPage = (cancel?: CancelTokenSource) => {
  return apiClient.get<TDonationPage>(`/donation/page`, {
    cancelToken: cancel?.token,
  });
};

/**
 * 일정표
 */

export const createSchedule = (params: TCalendar, cancel?: CancelTokenSource) => {
  return apiClient.post(`/information/calendar/create`, params, {
    cancelToken: cancel?.token,
  });
};

export const updateSchedule = (id: number, params?: TCalendar, cancel?: CancelTokenSource) => {
  return apiClient.put(`/information/calendar/${id}`, params, {
    cancelToken: cancel?.token,
  });
};
export const getSchedule = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TCalendar>(`/information/calendar/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const deleteSchedule = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/information/calendar/${id}`, {
    cancelToken: cancel?.token,
  });
};

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
export const getMainHistories = (cancel?: CancelTokenSource) => {
  return apiClient.get<TInformationHistory>(`/information/main/histories`, {
    cancelToken: cancel?.token,
  });
};

/**
 * 소모임 소개
 */
export const getSocietyAbouts = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TSocietyAboutDetail>>(`/society/abouts`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 조직도
 */
export const getPeople = (cancel?: CancelTokenSource) => {
  return apiClient.get<TPeople>(`/intro/people`, {
    cancelToken: cancel?.token,
  });
};

/**
 * 민우회 소개
 */
export const getAbout = (cancel?: CancelTokenSource) => {
  return apiClient.get<TAbout>(`/intro/about`, {
    cancelToken: cancel?.token,
  });
};

/**
 * 상담소 소개
 */
export const getClinicAbout = (cancel?: CancelTokenSource) => {
  return apiClient.get<TClinicAbout>(`/affiliate/clinic/about`, {
    cancelToken: cancel?.token,
  });
};

/**
 * 상담소 연혁
 */
export const getAffiliateHistories = (cancel?: CancelTokenSource) => {
  return apiClient.get<TInformationHistory>(`/affiliate/clinic/histories`, {
    cancelToken: cancel?.token,
  });
};
