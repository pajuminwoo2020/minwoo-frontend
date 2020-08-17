import {combineReducers} from 'redux';
import core from 'modules/core';
import user from 'modules/user';
import information from 'modules/information';

const rootReducer = combineReducers({
  core,
  user,
  information,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
