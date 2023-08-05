import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import Menu from './Menu';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('Menu Compoent', () => {
  test('아이콘 형태의 메뉴 팝업 버튼이 렌더링 되어야 한다.', () => {
    render(<Menu id={10} />, wrapper);

    const Component = screen.getByTestId('RNE__ICON');

    expect(Component).toBeVisible();
  });
});
