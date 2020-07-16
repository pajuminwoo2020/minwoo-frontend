import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {TBanner} from 'modules/information';
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