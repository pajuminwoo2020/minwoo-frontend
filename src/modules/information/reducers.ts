import produce from 'immer';
import {map} from 'lodash';
import {createReducer} from 'typesafe-actions';
import storage from 'libs/storage';
import {
  SET_INFORMATION,
} from 'modules/information/actions';
import {InformationAction, TInformationState} from 'modules/information/types';

const initialState: TInformationState = {
  info: undefined,
};
const information = createReducer<TInformationState, InformationAction>(initialState, {
  [SET_INFORMATION]: (state, action) => {
    return produce(state, (draft: TInformationState) => {
      storage.setItem('INFORMATION', action.payload);
      draft.info = action.payload;
    });
  },
});

export default information;
