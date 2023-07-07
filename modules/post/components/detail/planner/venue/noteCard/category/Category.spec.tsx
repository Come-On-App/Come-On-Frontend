import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import Category from './Category';

describe('Category Compoent', () => {
  test('카테고리가 올바르게 렌더링 되어야 한다.', () => {
    render(<Category type="관광명소" />, wrapper);

    expect(screen.getByText('관광명소')).toBeOnTheScreen();
  });
});
