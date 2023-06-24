import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import Font from './Font';
import ThemeProvider from '../ThemeProvider';

const wrapper = { wrapper: ThemeProvider };

describe('font Compoent', () => {
  const children = 'Hello World!';

  test('올바른 스타일과 폰트 패밀리로 자식을 렌더링 해야 한다.', () => {
    render(<Font>{children}</Font>, wrapper);

    const fontElement = screen.getByText(children);

    expect(fontElement).toHaveStyle({ fontFamily: 'Pretendard-Medium' });
    expect(fontElement).toBeOnTheScreen();
  });

  test('폰트 굵기 수정이 가능해야 한다.', () => {
    render(<Font bold>{children}</Font>, wrapper);

    const BoldFontElement = screen.getByText(children);

    expect(BoldFontElement).toHaveStyle({ fontFamily: 'Pretendard-SemiBold' });
    expect(BoldFontElement).toBeOnTheScreen();
  });
});
