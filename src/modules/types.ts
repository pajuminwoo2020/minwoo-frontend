import React from 'react';

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
};

export type TListRequestParams = {
  id?: number;
  params?: TPagination;
};

export type TListResponse<T> = {
  contents: Array<T>;
  last: boolean;
  total: number;
};
