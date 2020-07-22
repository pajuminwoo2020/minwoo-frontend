import React, {useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import Configs from 'config';

export function usePermission() {
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);
  let boardManagementPermission = false;

  if (currentUser?.groups?.includes('관리자') || currentUser?.groups?.includes('스태프'))
    boardManagementPermission = true;

  return [boardManagementPermission];
}
