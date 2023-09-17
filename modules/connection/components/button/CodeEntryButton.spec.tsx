import { describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import CodeEntryButton from './CodeEntryButton';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('CodeEntryButton Compoent', () => {
  const BUTTON_TEXT = '입장하기';

  test('버튼이 올바르게 렌더링 되어야 한다.', () => {
    render(
      <CodeEntryButton code="" codeDispatch={jest.fn()} dispatch={jest.fn()} />,
    );

    expect(
      screen.getByRole('button', {
        name: BUTTON_TEXT,
      }),
    ).toBeOnTheScreen();
  });

  test('코드 문자열이 6자 이하인 경우 비활성화된 상태를 렌더링 해야 한다.', () => {
    const emptyCode = '';
    const code = '1A2B';

    render(
      <CodeEntryButton
        code={emptyCode}
        codeDispatch={jest.fn()}
        dispatch={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: BUTTON_TEXT,
      }),
    ).toBeDisabled();

    render(
      <CodeEntryButton
        code={code}
        codeDispatch={jest.fn()}
        dispatch={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: BUTTON_TEXT,
      }),
    ).toBeDisabled();
  });

  test('코드 문자열이 6자 이상인 경우 활성화된 상태를 렌더링 해야 한다.', () => {
    const code = '1A2B3C';

    render(
      <CodeEntryButton
        code={code}
        codeDispatch={jest.fn()}
        dispatch={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: BUTTON_TEXT,
      }),
    ).toBeEnabled();
  });
});
