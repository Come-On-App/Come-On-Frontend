import { describe, expect, test } from '@jest/globals';

import { PixelRatio } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import {
  convertStringToDateInfo,
  convertToRelativeSize,
  createLengthValidator,
  formatDateRange,
  formatTimeWithAMPM,
  getAssetState,
  getDatesInRange,
  isExpiry,
  truncateText,
  validateCode,
} from './index';

describe('utils Test', () => {
  describe('formatDateRange Function', () => {
    const range = {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    };

    test('formatDateRange는 날짜 범위의 서식을 올바르게 포맷팅 해야한다.', () => {
      expect(formatDateRange(range)).toEqual('2023.06.10 ~ 2023.06.20');

      expect(formatDateRange({ startFrom: '2023-06-10' })).toEqual(
        '2023.06.10',
      );
    });

    test('두 번째 매개변수를 전달한다면 지정된 포맷 형식으로 포맷팅 되어야 한다.', () => {
      const expected = '2023년 06월 10일 ~ 2023년 06월 20일';

      expect(formatDateRange(range, 'ko')).toEqual(expected);
    });

    test('날짜 범위가 동일하다면 한개의 날짜 형식만 포맷팅 되어야 한다.', () => {
      const equalRange = {
        startFrom: '2023-06-10',
        endTo: '2023-06-10',
      };
      const expected = '2023년 06월 10일';

      expect(formatDateRange(equalRange, 'ko')).toEqual(expected);
    });
  });

  describe('formatTimeWithAMPM Function', () => {
    test('truncateText는 정해진 길이를 넘기지 않는 문자열만 반환해야 한다.', () => {
      const text = '12345678910';
      const max = 10;
      const textTruncator = truncateText(max);

      expect(textTruncator(text)).toEqual('1234567891');
    });

    test('truncateText는 정해진 길이를 넘기지 않으면 전달된 문자열 그대로 반환해야 한다.', () => {
      const text = '42456';
      const max = 10;
      const textTruncator = truncateText(max);

      expect(textTruncator(text)).toEqual('42456');
    });

    test('formatTimeWithAMPM 함수는 지정된 오전/오후 형태로 포맷팅 되어야 한다.', () => {
      const time1 = '06:00:00';
      const time2 = '18:00:00';
      const time3 = '12:00:00';

      expect(formatTimeWithAMPM(time1)).toEqual('오전 6:00');
      expect(formatTimeWithAMPM(time2)).toEqual('오후 6:00');
      expect(formatTimeWithAMPM(time3)).toEqual('오후 12:00');
    });
  });

  test('validateCode 함수는 숫자와 알파벳 대소문자 유효성 체크를 하여 boolean을 반환해야 한다.', () => {
    expect(validateCode('123ABCabc')).toEqual(true);
    expect(validateCode('123ABCabc!!')).toEqual(false);
  });

  test('createLengthValidator 함수는 지정된 길이와 문자열이 일치하는지 확인을 해야한다.', () => {
    const isZeroLength = createLengthValidator(0);
    const isTwoLength = createLengthValidator(2);

    expect(isZeroLength('')).toEqual(true);
    expect(isZeroLength('-')).toEqual(false);
    expect(isTwoLength('12')).toEqual(true);
  });

  describe('convertToRelativeSize Function', () => {
    // 테스트에 사용할 기기의 너비
    const deviceWidth = 400;

    test('convertToRelativeSize 함수를 호출하면 함수를 반환해야 한다.', () => {
      expect(typeof convertToRelativeSize(deviceWidth)).toBe('function');
    });

    test('convertToRelativeSize 함수는 상대적 사이즈를 올바르게 반환해야 한다.', () => {
      // 변환할 크기
      const size = 60;
      const relativeSizeConverter = convertToRelativeSize(deviceWidth);
      // 변환 함수를 사용하여 실제 변환 결과 얻기
      const actualSize = relativeSizeConverter(size);
      // 예상되는 변환 결과
      const expectedSize = PixelRatio.roundToNearestPixel(
        size * (deviceWidth / 375),
      );

      expect(actualSize).toBe(expectedSize);
    });
  });

  test('isExpiry 함수는 전달된 인수가 현재 시간을 기준으로 넘어갔는지 판단하여 반환해야 한다.', () => {
    expect(isExpiry('2020-08-30 23:11:30')).toBeTruthy();
    expect(isExpiry('2100-08-30 23:11:30')).toBeFalsy();
  });

  test('getDatesInRange 함수는 전달된 날짜 범위를 반환해야 한다.', () => {
    expect(getDatesInRange('2023-07-12', '2023-07-16')).toEqual([
      '2023-07-13',
      '2023-07-14',
      '2023-07-15',
    ]);
  });

  test('getAssetState 함수는 이미지 정보 객체를 반환해야 한다.', () => {
    const mockAssets: ImagePickerAsset = {
      assetId: 'AAF91AA8-3745-4111-9859-8D5B3DAA6845/L0/001',
      base64: null,
      duration: null,
      exif: null,
      fileName: 'IMG_0428.jpg',
      fileSize: 4735978,
      height: 3025,
      type: 'image',
      uri: 'file:///var/mobile/Containers/Data/Application/765B13C9-8464-43FD-A639-4A598E8A49A7/Library/Caches/ExponentExperienceData/%2540anonymous%252FCome-On-Frontend-7980b774-ba88-4342-aef4-ce4ec8bb5e40/ImagePicker/C36C3D02-A385-41EE-A04A-07702668ABF7.jpg',
      width: 3024,
    };

    expect(getAssetState(mockAssets)).toEqual({
      name: 'C36C3D02-A385-41EE-A04A-07702668ABF7.jpg',
      type: 'image/jpg',
      uri: 'file:///var/mobile/Containers/Data/Application/765B13C9-8464-43FD-A639-4A598E8A49A7/Library/Caches/ExponentExperienceData/%2540anonymous%252FCome-On-Frontend-7980b774-ba88-4342-aef4-ce4ec8bb5e40/ImagePicker/C36C3D02-A385-41EE-A04A-07702668ABF7.jpg',
    });
  });

  test('convertStringToDateInfo 함수는 문자열 형태의 날짜를 전달하면 타임 객체를 반환해야 한다.', () => {
    expect(convertStringToDateInfo('2023-07-31')).toEqual({
      dateString: '2023-07-31',
      day: 31,
      month: 7,
      timestamp: 1690761600000,
      year: 2023,
    });
  });
});
