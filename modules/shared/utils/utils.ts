import { IFormatDateRange } from './type';

// eslint-disable-next-line import/prefer-default-export
export function formatDateRange(range: IFormatDateRange) {
  return Object.values(range)
    .map((date) => date.split('-').join('.'))
    .join(' ~ ');
}
