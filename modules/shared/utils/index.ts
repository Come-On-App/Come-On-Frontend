import _ from 'lodash/fp';
import { memoize } from 'lodash';
import { Dimensions, PixelRatio } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import type { DateData } from 'react-native-calendars';

import { DateRange, PostState } from '@post/features/post/type';
import {
  AssetState,
  IformatDateRange,
  IapplyRelativeSizes,
  formatType,
} from './type';

/**
 * boolean 타입을 반전시킨다.
 */
export const invert = (value: boolean) => !value;

export const EMPTY_STRING = '';

function isEqualDate([first, second]: string[]) {
  return _.equals(first, second);
}

function joinDate(ymd: string[]) {
  const separator = ' ~ ';

  if (isEqualDate(ymd)) {
    return ymd[0];
  }

  return _.join(separator, ymd);
}

function splitDate(date: string) {
  const separator = '-';

  return _.split(separator, date);
}

function splitDateRange(range: IformatDateRange) {
  return _.map(splitDate, Object.values(range));
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

export function formatDateToKorean(
  dateString: string,
  addDayOfWeek = false,
): string {
  const dateFormatByKo = formatDate('ko');
  const formattedDate = dateFormatByKo(splitDate(dateString));

  return addDayOfWeek
    ? `${formattedDate} (${getDayOfWeek(dateString)})`
    : formattedDate;
}

export const koFormattedDate = formattedArrayProcessor('ko');

function formattedArrayMapper(type?: formatType) {
  const dateFormatted = formatDate(type);

  return (ymd: string[]) => _.map(dateFormatted, ymd);
}

function formattedArrayProcessor(
  type?: formatType,
): (range: IformatDateRange) => string[] {
  const formattedMapper = formattedArrayMapper(type);

  return _.flow([splitDateRange, formattedMapper]);
}

/**
 * 지정된 날짜 포맷 형식으로 날짜 형식을 수정한다.
 */
export function formatDateRange(
  range: IformatDateRange,
  type?: formatType,
): string {
  const formattedMapper = formattedArrayProcessor(type);

  return _.flow([formattedMapper, joinDate])(range);
}

/**
 * 글자 길이 유효성 검사를 해준다.
 */
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
 * date 형식을 문자열 형태로 가공한다. -> [00:00:00]
 */
export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursFormatted = hours.toString().padStart(2, '0');
  const minutesFormatted = minutes.toString().padStart(2, '0');

  return `${hoursFormatted}:${minutesFormatted}:00`;
}

/**
 * 문자열 date 형식을 Date 형태로 가공한다.
 */
export function formatTimeWithDate(time: string): Date {
  return new Date(`1970-01-01T${time}`);
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
 * 기기의 너비가 커지면 calculatedPxSize 값도 증가하고, 기기의 너비가 작아지면 calculatedPxSize 값도 감소한다.
 *
 * @param dimension 기준으로 계산될 크기를 전달한다. **(기본값은 기기의 너비 값)**
 * @param REFERENCE_WIDTH 피그마 작업 기준 너비
 * @returns 상대적인 사이즈 반환
 *
 * @example
 * ```ts
 * const relativeSizeConverter = convertToRelativeSize(Dimensions.get('window').width);
 *
 * relativeSizeConverter(avatarSize.width); // 기기의 너비에 따라 px 크기 계산
 * ```
 *
 */
export function convertToRelativeSize(
  dimension = Dimensions.get('window').width,
  REFERENCE_WIDTH = 375,
) {
  const cache = new Map<number, number>();

  return (size: number) => {
    const validatedSize = _.isNumber(size) ? size : 0;

    if (cache.has(validatedSize)) {
      return cache.get(validatedSize) as number;
    }

    const result = PixelRatio.roundToNearestPixel(
      validatedSize * (dimension / REFERENCE_WIDTH),
    );
    const calculatedData = Math.trunc(result);

    cache.set(validatedSize, calculatedData);

    return calculatedData;
  };
}

/**
 * 디바이스 사이즈에 따라서 상대적으로 크기를 가변시킨다.
 *
 * 기기의 너비가 커지면 size 값도 증가하고,
 *
 * 기기의 너비가 작아지면 size 값도 감소한다.
 */
export const relativeSizeConverter = convertToRelativeSize();

export const applyRelativeSizes: IapplyRelativeSizes = (sizes) => {
  if (_.isArray(sizes)) {
    return sizes.map(relativeSizeConverter);
  }

  return Object.values(sizes).map(relativeSizeConverter);
};

/**
 * 전달된 인수가 현재 시간을 기준으로 만료가 됐는지 파악한다.
 *
 * 전달 가능한 인수 타입: date 타입 형태 문자열 (년-월-일), UNIX TIME 형태
 */
export function isExpiry(date: string | number) {
  const targetDate = new Date(date);
  const currentDate = new Date();

  return targetDate < currentDate;
}

/**
 * 주어진 시작 날짜와 종료 날짜 사이의 날짜 목록을 반환
 * @param startDate - 시작 날짜(YYYY-MM-DD 형식의 문자열)
 * @param endDate - 종료 날짜(YYYY-MM-DD 형식의 문자열 또는 null)
 * @param itself - 시작 및 종료 날짜를 결과에 포함할지 여부
 * @returns 날짜 목록(YYYY-MM-DD 형식의 문자열 배열)
 */

export const generateDateRange = memoize(
  (startDate: string, endDate?: string | null, itself = false) => {
    // 마지막 날짜가 없거나 날짜가 동일한 경우
    if (!endDate || startDate === endDate) {
      return itself ? [startDate] : [];
    }

    const dates = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < lastDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (itself) {
      return [startDate, ...dates, endDate];
    }

    return dates;
  },
  (startDate, endDate, itself) => `${startDate}-${endDate}-${itself}`,
);

export function getDayOfWeek(dateString: string) {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateString);

  return daysOfWeek[date.getDay()];
}

function getFileName(uri: string) {
  const emptyFileName = 'noname.jpg';
  const fileName = uri.split('/').pop();

  return fileName ?? emptyFileName;
}

function inferTypeImage(fileName: string) {
  const match = /\.(\w+)$/.exec(fileName);
  const imageType = match ? `image/${match[1]}` : `image`;

  return imageType;
}

export function getAssetState(assets: ImagePickerAsset): AssetState {
  const imageURI = assets.uri;
  const fileName = getFileName(imageURI);
  const imageType = inferTypeImage(fileName);

  return {
    name: fileName,
    type: imageType,
    uri: imageURI,
  };
}

function createFormData(key: string) {
  return (value: string | Blob) => {
    const fromData = new FormData();

    fromData.append(key, value);

    return fromData;
  };
}

export function createImageFormData(imageFormData: string | Blob): FormData {
  const KEY = 'image';
  const formData = createFormData(KEY);

  return formData(imageFormData);
}

export function isPostFormValid({ image, name, dateRange }: PostState) {
  const hasImage = image.asset !== null || image.uri !== null;
  const hasName = name !== null;
  const hasDateRange =
    dateRange !== null && (dateRange.startingDay || dateRange.endingDay);

  // 모든 속성 값이 존재하는지 여부를 반환
  return Boolean(hasImage && hasName && hasDateRange);
}

/**
 * 주어진 인자 속성이 서로 다르면 true를 반환한다.
 */
export function hasPostStateChanged(
  prevState: PostState,
  nextState: PostState,
) {
  const equalName = prevState.name === nextState.name;
  const equalImage = _.isEqual(prevState.image, nextState.image);
  const equalDateRange = _.isEqual(prevState.dateRange, nextState.dateRange);

  return [equalName, equalImage, equalDateRange].some(
    (value) => value === false,
  );
}

export function convertStringToDateInfo(dateString: string): DateData {
  const date = new Date(dateString);
  const dateInfo: DateData = {
    dateString,
    day: date.getDate(),
    month: date.getMonth() + 1, // 월은 0부터 시작하므로 1을 더해준다.
    timestamp: date.getTime(),
    year: date.getFullYear(),
  };

  return dateInfo;
}

export function convertDateRangeToDateInfo(dateRange: IformatDateRange) {
  const [startingDay, endingDay] = Object.values(dateRange).map(
    convertStringToDateInfo,
  );

  return {
    startingDay,
    endingDay: isEqualDate([startingDay.dateString, endingDay.dateString])
      ? null
      : endingDay,
  };
}

/**
 * 날짜 객체를 지정된 날짜 포맷 형식으로 날짜 형식을 수정한다.
 */
export function getFormattedDateRange({ startingDay, endingDay }: DateRange) {
  if (!startingDay) {
    return EMPTY_STRING;
  }

  // startFrom과 endTo가 모두 존재하는 경우, 두 날짜를 포맷하여 범위 설정
  if (startingDay && endingDay) {
    return formatDateRange({
      startFrom: startingDay.dateString,
      endTo: endingDay.dateString,
    });
  }

  // startFrom이 존재하는 경우, startFrom.dateString을 포맷하여 범위 설정
  return formatDateRange({
    startFrom: startingDay.dateString,
  });
}

/**
 * 주어진 배열을 이용해 Map 객체를 생성.
 *
 * 두 번째 인자로 받은 속성을 키로 사용하여 배열의 각 객체를 맵핑.
 *
 * @param array - 맵핑할 객체들이 담긴 배열
 * @param property - 배열 내 객체를 맵핑할 때 사용할 속성 이름
 * @returns getByKey 메서드를 포함하는 객체
 */
export function indexByProperty<T, K extends keyof T>(array: T[], property: K) {
  if (!array || !property) {
    throw new Error('Invalid arguments');
  }

  const map = new Map<T[K], T>();

  array.forEach((item) => {
    const key = item[property];

    map.set(key, item);
  });

  const getByKey = (key: T[K]) => {
    return map.get(key) as T;
  };

  return { getByKey };
}
