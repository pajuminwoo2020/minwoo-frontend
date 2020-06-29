import {message} from 'antd';
import {UploadFile} from 'antd/es/upload/interface';
import {UploadChangeParam} from 'antd/lib/upload/interface';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {ECurrencyType} from 'enums/base.enum';
import {cookies, host} from '../libs/api/apiClient';


export const CCurrencyList = {
  [ECurrencyType.KRW]: 'KRW',
  [ECurrencyType.USD]: 'USD',
  [ECurrencyType.SGD]: 'SGD',
  [ECurrencyType.INR]: 'INR',
  [ECurrencyType.VND]: 'VND',
  [ECurrencyType.IDR]: 'IDR',
  [ECurrencyType.MYR]: 'MYR',
  [ECurrencyType.CNY]: 'CNY',
  [ECurrencyType.JPY]: 'JPY',
};

export const CCurrencyTypeByLanguage = {
  'en-US': 'USD',
  'ko-KR': 'KRW',
};
