import { describe, expect, test } from '@jest/globals';

import generateMarkedDate from './markedDate';

describe('markedDate Function', () => {
  const expected = {
    '2023-07-04': {
      color: '#EBF4FE',
      customTextStyle: {
        backgroundColor: '#337FFE',
        color: 'white',
        height: '100%',
        lineHeight: 34,
        textAlign: 'center',
        width: '100%',
      },
      startingDay: true,
    },
    '2023-07-05': { color: '#EBF4FE' },
    '2023-07-06': {
      color: '#EBF4FE',
      customTextStyle: {
        backgroundColor: '#337FFE',
        color: 'white',
        height: '100%',
        lineHeight: 34,
        textAlign: 'center',
        width: '100%',
      },
      endingDay: true,
    },
  };

  test('시작 날짜부터 끝 날짜까지 선택된 범위를 캘린더 속성에 맞게 반환해야 한다.', () => {
    expect(generateMarkedDate('2023-07-04', '2023-07-06')).toEqual(expected);
  });
});
