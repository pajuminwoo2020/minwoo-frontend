import {TUser} from 'modules/user/types';

/**
 * 소모임 -> 소개
 */

export type TSocietyAboutDetail = {
  name: string;
  activity: string;
};

export type TUpdateSocietyAboutDetail = {
  name?: string;
  activity?: string;
};

export type TCreateSocietyAboutDetail = {
  name: string;
  acitivity: string;
};
