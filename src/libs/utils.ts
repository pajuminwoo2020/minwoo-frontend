import React from 'react';
import {isEmpty, map, first} from 'lodash';
import {EUserLanguage} from 'enums/base.enum';

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
