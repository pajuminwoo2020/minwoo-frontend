import {createAction} from 'typesafe-actions';

export const SET_USER_LANGUAGE = 'users/SET_USER_LANGUAGE' as const;

export const setUserLanguage = createAction(SET_USER_LANGUAGE)<string>();
