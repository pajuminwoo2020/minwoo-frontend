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

export function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = window.atob(dataURI.split(',')[1]);
  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  // create a view into the buffer
  const ia = new Uint8Array(ab);
  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], {type: mimeString});
}
