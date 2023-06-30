import { describe, expect, test } from '@jest/globals';

import createTabBarIcon from './TabBarIcon';

describe('TabBarIcon Compoent', () => {
  const iconName = 'check';
  const tabColor = 'blue';

  test('특정 아이콘 속성를 기억하는 함수를 반환해야 한다.', () => {
    const fn = createTabBarIcon(iconName);

    expect(typeof fn).toBe('function');
    expect(fn({ color: tabColor }).props).toMatchObject({
      name: 'check',
      color: 'blue',
    });
  });
});
