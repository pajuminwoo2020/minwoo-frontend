import React from 'react';
import {UploadFile} from 'antd/es/upload/interface';
import {filter, isEmpty, map, first, get} from 'lodash';
import {EUserLanguage} from 'enums/base.enum';
import {TFiles} from 'modules/types';

export const sleep = (n: number) => new Promise(resolve => setTimeout(resolve, n));

export const getNavigatorLanguage = (lang?: string): EUserLanguage => {
  if (isEmpty(lang) === false) {
    return (first(lang?.split('-')) as EUserLanguage) || EUserLanguage.Korean;
  }

  if (window.location.pathname === '/en') {
    return EUserLanguage.English;
  }

  return EUserLanguage.Korean;
};

export function currentDateString() {
  let dateNow = new Date();
  return `${dateNow.getUTCFullYear()}\
-${('0' + (dateNow.getUTCMonth() + 1)).slice(-2)}\
-${('0' + dateNow.getUTCDate()).slice(-2)}`;
}

export function filteredFileNames(files: UploadFile[] & TFiles[]) {
  return map(
    filter(files, f => f.status === 'done'),
    v => (v.response ? get(v, 'response.id') : get(v, 'uid')),
  );
}

export function getLocalDate() {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timezoneDate = new Date(Date.now() - timezoneOffset);

  return timezoneDate.toISOString().slice(0, 10);
}
