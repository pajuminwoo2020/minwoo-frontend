import {first, isEmpty, isFinite, isNaN, replace} from 'lodash';

export const commifyRegExp = (value: string | number | undefined) => {
  if (isNaN(Number(value)) === true || isFinite(Number(value)) === false) {
    return '0';
  }

  return replace(`${Number(value)}`, /\B(?=(\d{3})+(?!\d))/g, ',');
};

/*
 * Normalize function
 */
export const normalizeInputNumber = (value: string | undefined) => {
  value = value ? value : '0';

  return replace(value, /\$\s?|(,*)/g, '');
};
