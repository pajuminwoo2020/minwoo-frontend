import produce from 'immer';
import {get} from 'lodash';
import {createReducer} from 'typesafe-actions';
import storage from 'libs/storage';
import {
  END_GUIDE_POPOVER,
  SET_GUIDE_POPOVER,
} from 'modules/core/actions';
import {CoreAction, CoreState} from 'modules/core/types';

const initialState: CoreState = {
  guide_popover: {
    key: storage.getItem('GUIDE_STATUS') || 'info',
  },
};

const core = createReducer<CoreState, CoreAction>(initialState, {
  [SET_GUIDE_POPOVER]: (state, action) =>
    produce(state, draft => {
      storage.setItem('GUIDE_STATUS', action.payload);
      draft.guide_popover = {
        key: action.payload,
      };
    }),
  [END_GUIDE_POPOVER]: (state, action) =>
    produce(state, draft => {
      storage.setItem('GUIDE_STATUS', 'end');
      draft.guide_popover = {
        key: 'end',
      };
    }),
});

export default core;
