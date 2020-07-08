import {CancelTokenSource} from 'axios';
import {TListRequestParams, TListResponse} from 'modules/types';
import {
  TBoardSettlement,
  TCreateBoardSettlement,
  TUpdateBoardSettlement,
} from 'modules/intro';
import apiClient from 'libs/api/apiClient';

/**
 * 결산보고 게시판
 */

export const getBoardSettlement = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardSettlement>(`/board/settlement/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardSettlement = (params: TCreateBoardSettlement, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/settlement', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardSettlement = (id?: number, params?: TUpdateBoardSettlement, cancel?: CancelTokenSource) => {
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
  return apiClient.get<TListResponse<TBoardSettlement>>(`/board/settlements`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

