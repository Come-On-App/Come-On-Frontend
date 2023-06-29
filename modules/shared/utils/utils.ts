import _ from 'lodash/fp';
import { PixelRatio } from 'react-native';
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
  const dateFormatted = formatDate(type);

  return (ymd: string[]) => _.map(dateFormatted, ymd);
}

/**
 * 지정된 날짜 포맷 형식으로 날짜 형식을 수정합니다.
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

/**
 * 전달된 길이와 일치하는지 확인하는 함수를 반환
 */
export function createLengthValidator(length: number) {
  return (str: string) => _.size(str) === length;
}

/**
 * 입력값이 숫자와 알파벳 대소문자인지 파악
 */
export function validateCode(value: string) {
  const RegExp = /^[a-zA-Z0-9]+$/;

  return RegExp.test(value);
}

/**
 * 기기의 너비가 커지면 calculatedPxSize 값도 증가하고, 기기의 너비가 작아지면 calculatedPxSize 값도 감소합니다.
 *
 * @param dimension 기준으로 계산될 크기를 전달합니다.
 * @param REFERENCE_WIDTH 피그마 작업 기준 너비
 * @returns 상대적인 사이즈 반환
 *
 * ```ts
 * const relativeSizeConverter = convertToRelativeSize(Dimensions.get('window').width);
 *
 * relativeSizeConverter(avatarSize.width); // 기기의 너비에 따라 px 크기 계산
 * ```
 *
 */
export function convertToRelativeSize(
  dimension: number,
  REFERENCE_WIDTH = 375,
) {
  return (size: number) =>
    PixelRatio.roundToNearestPixel(size * (dimension / REFERENCE_WIDTH));
}
