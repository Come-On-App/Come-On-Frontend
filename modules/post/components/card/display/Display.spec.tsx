import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import ThemeProvider from '@shared/components/ThemeProvider';
import Display from './Display';

describe('Display Compoent', () => {
  const children = 'Hello Wrold';

  test('name 속성을 전달하면 아이콘이 렌더링 되어야 한다.', () => {
    render(
      <Display name="check" disabled={false}>
        {children}
      </Display>,
      {
        wrapper: ThemeProvider,
      },
    );

    expect(screen.getByTestId('RNE__ICON')).toBeOnTheScreen();
  });

  test('text 속성을 전달하면 텍스트가 렌더링 되어야 한다.', () => {
    render(<Display name="check">{children}</Display>, {
      wrapper: ThemeProvider,
    });

    expect(screen.getByText(children)).toBeOnTheScreen();
  });

  test('disabled 속성에 따라서 아이콘이 올바르게 렌더링 되어야 한다.', () => {
    render(
      <Display name="check" disabled>
        {children}
      </Display>,
      {
        wrapper: ThemeProvider,
      },
    );

    expect(screen.queryByTestId('RNE__ICON')).toBeNull();

    render(
      <Display name="check" disabled={false}>
        {children}
      </Display>,
      {
        wrapper: ThemeProvider,
      },
    );

    expect(screen.getByTestId('RNE__ICON')).toBeOnTheScreen();
  });
});
