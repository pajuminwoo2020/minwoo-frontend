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

/**
 * 공지사항 게시판
 */

export const getBoardNotice = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/notice/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardNotice = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/notice', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardNotice = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/notice/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardNotice = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/notice/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardNotices = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/notices`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 민우액션 게시판
 */

export const getBoardAction = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/action/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardAction = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/action', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardAction = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/action/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardAction = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/action/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardActions = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/actions`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 회원활동 게시판
 */

export const getBoardActivityMember = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/activity_member/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardActivityMember = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/activity_member', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardActivityMember = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/activity_member/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardActivityMember = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/activity_member/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardActivityMembers = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/activity_members`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 지역소식 게시판
 */

export const getBoardPress = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/press/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardPress = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/press', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardPress = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/press/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardPress = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/press/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardPresses = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/presses`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 회원공간 게시판
 */

export const getBoardMemberSpace = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/member_space/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardMemberSpace = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/member_space', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardMemberSpace = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/member_space/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardMemberSpace = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/member_space/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardMemberSpaces = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/member_spaces`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 소모임활동 게시판
 */

export const getBoardSocietyActivity = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/society_activity/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardSocietyActivity = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/society_activity', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardSocietyActivity = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/society_activity/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardSocietyActivity = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/society_activity/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardSocietyActivitys = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/society_activities`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 소식지 게시판
 */

export const getBoardNewsLetter = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/newsletter/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardNewsLetter = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/newsletter', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardNewsLetter = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/newsletter/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardNewsLetter = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/newsletter/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardNewsLetters = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/newsletters`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 갤러리 게시판
 */

export const getBoardGallery = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/gallery/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardGallery = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/gallery', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardGallery = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/gallery/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardGallery = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/gallery/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardGallerys = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/gallerys`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * 자료실 게시판
 */

export const getBoardDrive = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.get<TBoardDetail>(`/board/drive/${id}`, {
    cancelToken: cancel?.token,
  });
};
export const createBoardDrive = (params: TCreateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.post('/board/drive', params, {
    cancelToken: cancel?.token,
  });
};

export const updateBoardDrive = (id?: number, params?: TUpdateBoardDetail, cancel?: CancelTokenSource) => {
  return apiClient.put(`/board/drive/${id}`, params, {
    cancelToken: cancel?.token,
  });
};

export const deleteBoardDrive = (id: number, cancel?: CancelTokenSource) => {
  return apiClient.delete(`/board/drive/${id}`, {
    cancelToken: cancel?.token,
  });
};

export const getBoardDrives = ({params}: TListRequestParams, cancel?: CancelTokenSource) => {
  return apiClient.get<TListResponse<TBoardDetail>>(`/board/drives`, {
    params: params,
    cancelToken: cancel?.token,
  });
};

/**
 * Category
 */

export const getCategoriesSelect = (board_type: string, cancel?: CancelTokenSource) => {
  return apiClient.get(`board/categories/select/${board_type}`, {
    cancelToken: cancel?.token,
  });
};
