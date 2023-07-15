import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/utils/customRender';
import AddVenue from './AddVenue';

describe('addVenue Compoent', () => {
  test('장소를 추가할 수 있는 버튼이 올바르게 렌더링 되어야 한다.', () => {
    render(<AddVenue />, wrapper);

    expect(screen.getByTestId(TestId.post.button.addVenue)).toBeOnTheScreen();

    expect(screen.getByTestId('RNE__ICON')).toBeOnTheScreen();

    expect(screen.getByText('새로운 장소를 추가해 보세요!')).toBeOnTheScreen();
  });
});
