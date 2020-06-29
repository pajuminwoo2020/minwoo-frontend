import produce from 'immer';
import {map} from 'lodash';
import {createReducer} from 'typesafe-actions';
import storage from 'libs/storage';
import {
  SET_USER_LANGUAGE,
} from 'modules/user/actions';
import {TUserState, UserAction} from 'modules/user/types';

const initialState: TUserState = {
  language: undefined
};
const users = createReducer<TUserState, UserAction>(initialState, {
  [SET_USER_LANGUAGE]: (state, action) => {
    return produce(state, (draft: TUserState) => {
      draft.language = action.payload;
    });
  },
});

export default users;
