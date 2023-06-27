import { describe, expect, test } from '@jest/globals';

import {
  formatDateRange,
  formatTimeWithAMPM,
  truncateText,
  validateCode,
} from './utils';

describe('utils Test', () => {
  describe('formatDateRange Function', () => {
    const range = {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    };

    test('formatDateRange는 날짜 범위의 서식을 올바르게 포맷팅 해야한다.', () => {
      const expected = '2023.06.10 ~ 2023.06.20';

      expect(formatDateRange(range)).toEqual(expected);
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
  });

  test('formatTimeWithAMPM 함수는 지정된 오전/오후 형태로 포맷팅 되어야 한다.', () => {
    const time1 = '06:00:00';
    const time2 = '18:00:00';
    const time3 = '12:00:00';

    expect(formatTimeWithAMPM(time1)).toEqual('오전 6:00');
    expect(formatTimeWithAMPM(time2)).toEqual('오후 6:00');
    expect(formatTimeWithAMPM(time3)).toEqual('오후 12:00');
  });

  test('validateCode 함수는 숫자와 알파벳 대소문자 유효성 체크를 하여 boolean을 반환해야 한다.', () => {
    expect(validateCode('123ABCabc')).toEqual(true);
    expect(validateCode('123ABCabc!!')).toEqual(false);
  });
});
