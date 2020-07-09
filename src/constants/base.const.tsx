import React from 'react';
import {ECurrencyType} from 'enums/base.enum';


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
