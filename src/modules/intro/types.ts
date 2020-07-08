import {TUser} from 'modules/user/types';

/**
 * 소개 -> 결산보고
 */

export type TBoardSettlement = {
  id: number;
  title: string;
  body?: string;
  hit_count: number;
  created_by: TUser;
  created_at: string;
  updated_at: string;
}

export type TUpdateBoardSettlement = {
  title?: string;
  body?: string;
};

export type TCreateBoardSettlement = {
  title: string;
  body: string;
};
