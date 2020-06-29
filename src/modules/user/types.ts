import {ActionType} from 'typesafe-actions';
import * as actions from 'modules/user/actions';

/**
 * User
 */

export type UserAction = ActionType<typeof actions>;

export type TUserState = {
  language: string | undefined;
};

export type TUser = {
  id: number;
  userid: string;
  fullname: string;
  fullname_local: string;
  fullname_en: string;
  language: string;
  timezone: string;
  last_login: string;
};

export type TUpdateUser = {
  userid?: string;
  fullname_local?: string;
  fullname_en?: string;
  language?: string;
  timezone?: string;
};

export type TUserLogin = {
  userid: string;
  password: string;
  remember?: boolean;
};

export type TCreateUser = {
  userid: string;
  fullname_local: string;
  fullname_en?: string;
  password: string;
};
