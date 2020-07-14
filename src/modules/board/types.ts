import {TUser} from 'modules/user/types';

/**
 * 게시판 글쓰기/수정
 */

export type TBoardDetail = {
  id: number;
  title: string;
  body?: string;
  hit_count: number;
  created_by: TUser;
  created_at: string;
  updated_at: string;
};

export type TUpdateBoardDetail = {
  title?: string;
  body?: string;
};

export type TCreateBoardDetail = {
  title: string;
  body: string;
};