import { describe, expect, test, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/utils/customRender';
import MeetingPostCreator from './MeetingPostCreator';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe('MeetingPostCreator Compoent', () => {
  test('모임 생성 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<MeetingPostCreator />, wrapper);

    expect(screen.getByTestId(TestId.post.creator)).toBeOnTheScreen();
  });

  test('초기 상태에는 버튼이 Disabled 처리가 되어야 한다.', () => {
    render(<MeetingPostCreator />, wrapper);

    expect(
      screen.getByRole('button', {
        name: '완료',
      }),
    ).toBeDisabled();
  });
});
