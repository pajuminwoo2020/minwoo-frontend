import {combineReducers} from 'redux';
import core from 'modules/core';
import user from 'modules/user';

const rootReducer = combineReducers({
  core,
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
