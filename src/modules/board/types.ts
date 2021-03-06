import {TUser} from 'modules/user/types';
import {EBoardClassType, EBoardType} from 'enums/board.enum';

/**
 * 게시판 글쓰기/수정
 */

export type TBoardDetail = {
  id: number;
  title: string;
  body?: string;
  hit_count: number;
  created_by: TUser;
  board_type?: EBoardClassType;
  category?: TCategory;
  on_board_action?: EBoardType;
  created_at: string;
  updated_at: string;
};

export type TUpdateBoardDetail = {
  title?: string;
  body?: string;
  category?: number;
  on_board_action?: EBoardType;
  thumbnail_source?: string;
  file_ids?: number[];
};

export type TCreateBoardDetail = {
  title: string;
  body: string;
  category?: number;
  on_board_action?: EBoardType;
  thumbnail_source?: string;
  file_ids?: number[];
};

export type TCategory = {
  id: number;
  name: string;
}
