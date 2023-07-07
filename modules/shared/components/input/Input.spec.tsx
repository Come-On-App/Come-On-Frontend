import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import Input from './Input';
import { wrapper } from '../../utils/customRender';

describe('Input Compoent', () => {
  test('빈 문자열 상태에서는 placeholder 텍스트가 렌더링 되어야 한다.', () => {
    const text = '';
    const placeholder = '모임 이름을 입력해 주세요!';

    render(<Input text={text} placeholder={placeholder} />, wrapper);

    expect(
      screen.getByPlaceholderText('모임 이름을 입력해 주세요!'),
    ).toBeOnTheScreen();
  });

  test('전달된 텍스트가 올바르게 렌더링 되어야 한다.', () => {
    const text = 'apple';

    render(<Input text={text} />, wrapper);

    expect(screen.getByDisplayValue('apple')).toBeOnTheScreen();
  });
});
