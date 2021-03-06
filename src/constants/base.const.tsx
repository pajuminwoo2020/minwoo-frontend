import React from 'react';
import {ECurrencyType} from 'enums/base.enum';
import Configs from 'config';
import {message} from 'antd';
import {cookies, CCSRFToken} from 'libs/api/apiClient';
import {UploadChangeParam} from 'antd/lib/upload/interface';

export const CWindowWidth = 1000;
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

export const CDefaultEditorHeight = 700;
export const CDefaultEditorPlugins = [
  'preview advlist autolink lists link image charmap hr anchor pagebreak',
  'searchreplace',
  'insertdatetime nonbreaking save table contextmenu directionality',
  'emoticons paste textcolor colorpicker textpattern'
];
export const CDefaultEditorToolbars = 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link image preview';
export const CDefaultDateTimeFormat = 'YYYY-MM-DD HH:mm';
export const CMaxFileSize = '50MB';
export const CUploadProps = {
  withCredentials: true,
  showUploadList: {
    showDownloadIcon: false,
  },
  action: `${Configs.API_HOST}/board/file`,
  headers: {
    accept: 'application/json',
    'X-CSRFToken': cookies.get(CCSRFToken),
  },
  onChange: (info: UploadChangeParam) => {
    const {status} = info.file;

    if (status === 'done') {
      message.success(`${info.file.name} 업로드에 성공했습니다.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 업로드에 실패했습니다.(파일은 ${CMaxFileSize}보다 클 수 없습니다.)`);
    }
  },
  multiple: true,
};

export const CDateFormat = 'YYYY-MM-DD';
