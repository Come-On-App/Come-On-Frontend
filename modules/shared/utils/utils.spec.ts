import { describe, expect, test } from '@jest/globals';

import { formatDateRange, formatTimeWithAMPM, truncateText } from './utils';

describe('utils Test', () => {
  test('formatDateRange는 날짜 범위의 서식을 올바르게 포맷팅 해야한다.', () => {
    const range = {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    };
    const expected = '2023.06.10 ~ 2023.06.20';

    expect(formatDateRange(range)).toEqual(expected);
  });

  test('truncateText는 정해진 길이를 넘기지 않는 문자열만 반환해야 한다.', () => {
    const text = '12345678910';
    const max = 10;
    const textTruncator = truncateText(max);

    expect(textTruncator(text)).toEqual('1234567891');
  });

  test('formatTimeWithAMPM 함수는 지정된 오전/오후 형태로 포맷팅 되어야 한다.', () => {
    const time1 = '06:00:00';
    const time2 = '18:00:00';

    expect(formatTimeWithAMPM(time1)).toEqual('오전 6:00');
    expect(formatTimeWithAMPM(time2)).toEqual('오후 6:00');
  });
});
