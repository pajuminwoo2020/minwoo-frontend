import {EBannerType} from 'enums/information.enum';

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

export type InformationHistory = {
  kind: number;
  year: number;
  body: string;
}
