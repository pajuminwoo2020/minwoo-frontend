import {first, isEmpty, isFinite, isNaN, replace} from 'lodash';

/*
 * Formatter
 */

export const dateRegExp = /^[0-9]{4}[-]*[0-9]{2}[-]*[0-9]{2}$/;
export const commifyFormatter = (value: string | number | undefined) => {
  if (isNaN(Number(value)) === true || isFinite(Number(value)) === false) {
    return '0';
  }

  return replace(`${Number(value)}원`, /\B(?=(\d{3})+(?!\d))/g, ',');
};

/*
 * Normalize function
 */
export const commifyParser = (value: string | undefined) => {
  value = value ? value : '0';

  return replace(value, /\원\s?|(,*)/g, '');
};
export const dateParser = (value: string | undefined) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 4)
    return onlyNums;

  if (onlyNums.length <= 6)
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}`;

  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}-${onlyNums.slice(6,8)}`;
};
