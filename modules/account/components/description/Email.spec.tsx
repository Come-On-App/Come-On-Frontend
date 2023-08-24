import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import Email from './Email';

describe('Email Compoent', () => {
  const EMPTY = ' ';

  test('이메일 정보가 없다면 빈 문자열을 렌더링해야한다.', () => {
    render(<Email />);

    expect(screen.getByText(EMPTY)).toBeOnTheScreen();
  });
});
