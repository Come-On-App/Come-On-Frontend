import { describe, expect, test } from '@jest/globals';

import { formatDateRange } from './utils';

describe('utils Test', () => {
  test('formatDateRange는 날짜 범위의 서식을 올바르게 포맷팅 해야한다.', () => {
    const range = {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    };
    const expected = '2023.06.10 ~ 2023.06.20';

    expect(formatDateRange(range)).toEqual(expected);
  });
});
