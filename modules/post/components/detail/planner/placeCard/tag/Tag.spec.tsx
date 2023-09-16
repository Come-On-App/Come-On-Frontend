import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import Tag from './Tag';

describe('Tag Compoent', () => {
  test('화면 타이틀이 올바르게 렌더링 되어야 한다.', () => {
    render(<Tag />);
    const screenTitle = screen.getByText('태그');

    expect(screenTitle).toBeTruthy();
  });

  test('드롭다운이 올바르게 렌더링 되어야 한다.', () => {
    render(<Tag />);
    const dropdown = screen.getByText('태그를 선택해 주세요!');

    expect(dropdown).toBeTruthy();
  });
});
