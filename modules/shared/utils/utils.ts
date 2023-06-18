import { IFormatDateRange } from './type';

export function formatDateRange(range: IFormatDateRange) {
  return Object.values(range)
    .map((date) => date.split('-').join('.'))
    .join(' ~ ');
}

export function truncateText(maxLength: number) {
  return (currentText: string) => {
    if (currentText.length > maxLength) {
      return currentText.slice(0, maxLength);
    }

    return currentText;
  };
}
