import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import Menu from './Menu';

describe('Menu Compoent', () => {
  test('아이콘 형태의 메뉴 팝업 버튼이 렌더링 되어야 한다.', () => {
    render(<Menu />, wrapper);

    const Component = screen.getByTestId('RNE__ICON');

    expect(Component).toBeVisible();
  });
});
