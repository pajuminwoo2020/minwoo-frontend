import {createAction} from 'typesafe-actions';
import {TInformation} from 'modules/information';

export const SET_INFORMATION = 'information/SET_INFORMAION' as const;

export const setInformation = createAction(SET_INFORMATION)<TInformation>();
