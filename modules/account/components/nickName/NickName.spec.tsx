import { describe, expect, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { render } from '@shared/components/ThemeProvider';
import TestId from '@shared/constants/testIds';
import NickName from './NickName';

describe('NickName Compoent', () => {
  test('닉네임이 올바르게 렌더링 되어야 한다.', () => {
    render(<NickName name="Apple" />);

    expect(screen.getByDisplayValue('Apple')).toBeOnTheScreen();
  });

  test('닉네임이 수정되면 수정 아이콘이 렌더링 되어야 한다.', () => {
    render(<NickName name="Apple" />);

    fireEvent.changeText(screen.getByDisplayValue('Apple'), 'Appl');

    expect(screen.getByDisplayValue('Appl')).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.shared.button.icon)).toBeOnTheScreen();
  });

  test('닉네임의 상태가 빈 문자열이라면 기존의 닉네임을 표시해야 한다.', () => {
    render(<NickName name="Apple" />);

    fireEvent.changeText(screen.getByPlaceholderText('Apple'), '');

    expect(screen.getByPlaceholderText('Apple')).toBeOnTheScreen();
  });

  test('닉네임의 글자 수가 올바르게 렌더링 되어야 한다.', () => {
    render(<NickName name="Apple" />);

    expect(screen.getByText('5/20')).toBeOnTheScreen();
  });

  test('닉네임이 업데이트될 때마다 글자 수가 업데이트되어야 한다.', () => {
    render(<NickName name="Apple" />);

    fireEvent.changeText(screen.getByDisplayValue('Apple'), 'Apple123');

    expect(screen.getByText('8/20')).toBeOnTheScreen();
  });
});
