import _ from 'lodash/fp';
import { IFormatDateRange, formatType } from './type';

function isEqualDate([first, second]: string[][]) {
  return _.equals(first, second);
}

function joinDate(ymd: string[][]) {
  const separator = ' ~ ';

  if (isEqualDate(ymd)) {
    return ymd[0];
  }

  return _.join(separator, ymd);
}

function spliteDate(date: string) {
  const separator = '-';

  return _.split(separator, date);
}

function spliteDateRange(range: IFormatDateRange) {
  return _.map(spliteDate, Object.values(range));
}

function formatDate(type?: formatType) {
  return ([year, month, day]: string[]) => {
    switch (type) {
      case 'ko':
        return `${year}년 ${month}월 ${day}일`;
      default:
        return `${year}.${month}.${day}`;
    }
  };
}

function formattedArrayMapper(type?: formatType) {
  return (ymd: string[]) => _.map(formatDate(type), ymd);
}

/**
 * 지정된 포맷 형식으로 날짜 형식을 수정합니다.
 */
export function formatDateRange(
  range: IFormatDateRange,
  type?: formatType,
): string {
  const formattedMapper = formattedArrayMapper(type);

  return _.flow([spliteDateRange, formattedMapper, joinDate])(range);
}

export function truncateText(maxLength: number) {
  return (currentText: string) => {
    if (currentText.length > maxLength) {
      return currentText.slice(0, maxLength);
    }

    return currentText;
  };
}

// formatTimeWithAMPM 헬퍼 함수
function getMeridiemKR(hour: number) {
  const AM = '오전';
  const PM = '오후';

  return hour >= 12 ? PM : AM;
}

export function formatTimeWithAMPM(time: string) {
  const [hour, minute] = time.split(':');
  const parsedHour = parseInt(hour, 10);
  const formattedHour = parsedHour % 12 || 12; // 오후 18:00 형태가 아닌 오후 6:00 형태로 만들기 위함
  const meridiem = getMeridiemKR(parsedHour);

  return `${meridiem} ${formattedHour}:${minute}`;
}
