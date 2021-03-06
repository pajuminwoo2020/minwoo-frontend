import React, {ReactNode} from 'react';
import {EBoardOperation} from 'enums/board.enum';

export type TErrorResponse = {
  error_message: string;
  error_code: number;
  invalid_field_groups: Array<Record<string, string>> | null;
};

export type TPagination = {
  id?: number;
  q?: string;
  current?: number;
  pageSize?: number;
  category?: string;
};

export type TListRequestParams = {
  id?: number;
  params?: TPagination;
  selected_date?: string;
};

export type TListResponse<T> = {
  contents: Array<T>;
  last: boolean;
  total: number;
};

export type RouteMatch = {
  record_id: number;
  operation: EBoardOperation;
};

export type TFiles = {
  uid: number;
  status: string;
  name: string;
  absolute_url: string;
};

export type TModalState = {
  record?: any;
  visible: boolean;
};

export type TModalProps = {
  modalState: TModalState;
  setModalState: React.Dispatch<React.SetStateAction<TModalState>>;
};

export type TSelectList = Array<{
  label: string | ReactNode;
  value: number | string;
}>;
