import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import Font from './Font';
import ThemeProvider from '../ThemeProvider';

describe('font Compoent', () => {
  const children = 'Hello World!';

  test('올바른 스타일과 폰트 패밀리로 자식을 렌더링 해야 한다.', () => {
    render(<Font>{children}</Font>, { wrapper: ThemeProvider });

    const fontElement = screen.getByText(children);

    expect(fontElement).toHaveStyle({ fontFamily: 'pretendard-regular' });
    expect(fontElement).toBeOnTheScreen();
  });

  test('폰트 굵기 수정이 가능해야 한다.', () => {
    render(<Font bold>{children}</Font>, { wrapper: ThemeProvider });

    const BoldFontElement = screen.getByText(children);

    expect(BoldFontElement).toHaveStyle({ fontFamily: 'pretendard-bold' });
    expect(BoldFontElement).toBeOnTheScreen();
  });
});
