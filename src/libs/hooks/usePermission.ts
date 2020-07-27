import React, {useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import Configs from 'config';
import {EGroup} from 'enums/base.enum';

export function usePermission() {
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);
  let boardManagementPermission = false;
  let adminPagePermission = false;

  if (currentUser?.groups?.includes(EGroup.Admin) || currentUser?.groups?.includes(EGroup.Staff))
    boardManagementPermission = true;
  if (currentUser?.groups?.includes(EGroup.Admin))
    adminPagePermission = true;

  return {boardManagementPermission, adminPagePermission};
}
