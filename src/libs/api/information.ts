import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {TBanner, TDonation} from 'modules/information';
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
