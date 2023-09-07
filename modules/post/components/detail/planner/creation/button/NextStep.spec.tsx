import { describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import store from '@app/redux/store';
import { updateTitle } from '@post/features/detail/plannerSlice';
import { render } from '@shared/utils/customRender';
import NextStep from './NextStep';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('NextStep Compoent', () => {
  test('제목 필드가 입력되면 버튼이 활성화 되어야 한다.', () => {
    render(<NextStep />);

    expect(screen.getByRole('button', { name: '다음' })).toBeDisabled();

    // 제목 필드상태 반영
    store.dispatch(updateTitle('update Title'));

    render(<NextStep />);

    expect(screen.getByRole('button', { name: '다음' })).toBeEnabled();
  });
});
