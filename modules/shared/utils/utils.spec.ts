import { describe, expect, test } from '@jest/globals';

import { formatDateRange, truncateText } from './utils';

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
});
