import produce from 'immer';
import {map} from 'lodash';
import {createReducer} from 'typesafe-actions';
import storage from 'libs/storage';
import {
  SET_USER_INFO,
} from 'modules/user/actions';
import {UserAction, TUserState} from 'modules/user/types';

const initialState: TUserState = {
  current_user: undefined,
};
const users = createReducer<TUserState, UserAction>(initialState, {
  [SET_USER_INFO]: (state, action) => {
    return produce(state, (draft: TUserState) => {
      storage.setItem('CURRENT_USER', action.payload);
      draft.current_user = action.payload;
    });
  },
});

export default users;
