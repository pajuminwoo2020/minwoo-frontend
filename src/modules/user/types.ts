import {ActionType} from 'typesafe-actions';
import * as actions from 'modules/user/actions';

/**
 * User
 */

export type UserAction = ActionType<typeof actions>;

export type TUserState = {
  current_user: TUser | undefined;
};

export type TUser = {
  id: number;
  userid: string;
  fullname: string;
  language: string;
  timezone: string;
  last_login: string;
  groups: Array<string>;
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
  is_remember?: boolean;
};

export type TUserCreate = {
  userid: string;
  password: string;
  fullname_local: string;
};

export type TUserUpdate = {
  fullname_local?: string;
};

export type TPasswordChange = {
  password_old: string;
  password_new: string;
};

export type TPasswordReset = {
  userid: string;
};
