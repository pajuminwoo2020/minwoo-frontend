import {createAction} from 'typesafe-actions';
import {TUser} from 'modules/user';

export const SET_USER_INFO = 'users/SET_USER_INFO' as const;

export const setUserInfo = createAction(SET_USER_INFO)<TUser>();
