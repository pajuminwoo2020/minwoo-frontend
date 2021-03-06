import {EBannerType, EMotivation} from 'enums/information.enum';
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
  location_subway : string;
  location_bus : string;
  location_car : string;
  registration_number: string;
  email: string;
  phone: string;
  fax: string;
  bank_account: string;
  phone_counseling: string;
  webhost_counseling: string;
  instagram_feed: string;
  location_latitude: number;
  location_longitude: number;
  donation_url: string;
  affiliate_url: string;
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
  applicant_name: string;
  applicant_birthday: string;
  applicant_phone: string;
  account_holder_name: string;
  account_holder_birthday: string;
  account_holder_phone: string;
  email: string;
  bank_name: string;
  account_number: string;
  address?: string;
  memo?: string;
  resident_registration_number?: string;
  image_signature: Blob;
  agree_receipt: boolean;
  agree_unique: boolean;
  agree_personal: boolean;
  agree_offer: boolean;
  agree_newsletter: boolean;
  agree_email: boolean;
  motivation: EMotivation;
};

export type TDonationPage = {
  introduction: string;
  benefits: string;
  payment_method: string;
  regular: string;
  temporary: string;
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
  absolute_url: string;
};

/**
 * 조직도
 */
export type TPeople = {
  absolute_url: string;
};

/**
 * 민우회 소개
 */
export type TAbout = {
  introduction: string;
  watchword: string;
  purpose: string;
};

/**
 * 상담소 소개
 */
export type TClinicAbout = {
  purpose: string;
  activity: string;
};
