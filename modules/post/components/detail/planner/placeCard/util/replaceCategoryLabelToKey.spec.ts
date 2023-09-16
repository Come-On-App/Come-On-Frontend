import { describe, expect, test } from '@jest/globals';

import { CategoryKey, CategoryLabel } from '@post/api/v2/type';
import { replaceCategoryLabelToKey } from './categoryMap';

describe('replaceCategoryLabelToKey function', () => {
  const testCases: { input: CategoryKey; expected: CategoryLabel }[] = [
    { input: 'SCHOOL', expected: '학교' },
    { input: 'CAFE', expected: '카페' },
    { input: 'BAR', expected: '술집' },
    { input: 'SPORT', expected: '스포츠' },
    { input: 'SHOPPING', expected: '쇼핑' },
    { input: 'ATTRACTION', expected: '관광명소' },
    { input: 'RESTAURANT', expected: '음식점' },
    { input: 'ACCOMMODATION', expected: '숙박' },
    { input: 'CULTURE', expected: '문화시설' },
    { input: 'ACTIVITY', expected: '액티비티' },
    { input: 'ETC', expected: '기타' },
  ];

  testCases.forEach(({ input, expected }) => {
    test(`should replace ${input} with ${expected}`, () => {
      const result = replaceCategoryLabelToKey(input);

      expect(result).toBe(expected);
    });
  });
});
