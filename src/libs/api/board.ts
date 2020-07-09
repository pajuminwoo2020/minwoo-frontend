import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {
  TBoardDetail,
  TCreateBoardDetail,
  TUpdateBoardDetail,
} from 'modules/board';
import apiClient from 'libs/api/apiClient';

/**
 * 결산보고 게시판
 */

export const getBoardSettlement = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/settlement/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardSettlement = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/settlement', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardSettlement = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/settlement/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardSettlement = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/settlement/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardSettlements = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/settlements`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

