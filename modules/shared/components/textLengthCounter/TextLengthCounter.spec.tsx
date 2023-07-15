import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import TextLengthCounter from './TextLengthCounter';

describe('TextLengthCounter Compoent', () => {
  test('입력된 텍스트의 길이를 화면에 렌더링 해야한다.', () => {
    const text = 'abcdefg';
    const max = 30;

    render(<TextLengthCounter text={text} max={max} />, wrapper);

    expect(screen.getByText('7/30')).toBeOnTheScreen();
  });

  test('제한된 텍스트 길이를 넘기지 않아야 한다', () => {
    const text = 'abcdefg';
    const max = 5;

    render(<TextLengthCounter text={text} max={max} />, wrapper);

    expect(screen.getByText('5/5')).toBeOnTheScreen();
  });
});
