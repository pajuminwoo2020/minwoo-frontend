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
 * 연혁 
 */

export type InformationHistory = {
  kind: number;
  year: number;
  body: string;
}


