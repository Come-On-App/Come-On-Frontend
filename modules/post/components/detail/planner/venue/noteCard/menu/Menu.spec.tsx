import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import NoteCardMenu from './Menu';

describe('NoteCardMenu Compoent', () => {
  test('아이콘 형태의 메뉴 팝업 버튼이 렌더링 되어야 한다.', () => {
    render(<NoteCardMenu />, wrapper);

    const Component = screen.getByTestId('RNE__ICON');

    expect(Component).toBeVisible();
  });
});
