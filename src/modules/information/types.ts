import {EBannerType} from 'enums/information.enum';
import {ActionType} from 'typesafe-actions';
import * as actions from 'modules/information/actions';

/**
 * 회사정보
 */
export type TInformation = {
  membership_management: string;
  membership_management_email: string;
  membership_management_phone: string;
  chief_executive: string;
  address_street: string;
  address_jibun: string;
  registration_number: string;
  email: string;
  phone: string;
  fax: string;
  bank_account: string;
  phone_counseling: string;
  webhost_counseling: string;
};

export type InformationAction = ActionType<typeof actions>;

export type TInformationState = {
  info: TInformation | undefined;
};

/**
 * 배너
 */

export type TBanner = {
  href: string;
  absolute_url: string;
  banner_type: EBannerType;
};

/**
 * 후원금
 */

export type TDonation = {
  donation_type: string;
  price: number;
  period: number;
  user_name: string;
  birthday: string;
  phone: string;
  email: string;
  bank_account: string;
  address: string;
  memo: string;
};

/**
 * 일정표
 */

export type TCalendar = {
  schedule_name: string;
  schedule_from: string;
  schedule_to: string;
  memo?: string;
};

/**
 * 연혁
 */

export type TInformationHistory = Array<{
  year: string;
  children: Array<{
    date_at: string;
    memo: string;
  }>;
}>;

/**
 * 소모임 소개
 */
export type TSocietyAboutDetail = {
  name: string;
  description: string;
  schedule: Array<string>;
  main_activity: Array<string>;
  website: string;
  is_default: boolean;
};

/**
 * 조직도
 */
export type TPeople = Array<{
  position: string;
  children: Array<{
    name: string;
    job: string;
  }>;
}>;

export type TAbout = {
  introduction: string;
  watchword: string;
};

export type TClinicAbout = {
  purpose: string;
  activity: string;
};