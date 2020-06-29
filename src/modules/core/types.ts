import React from 'react';
import {ActionType} from 'typesafe-actions';
import * as actions from 'modules/core/actions';

export type CoreAction = ActionType<typeof actions>;

export type CoreState = {
  guide_popover: TGuidePopover;
};

export type TGuidePopover = {
  key: string;
};
