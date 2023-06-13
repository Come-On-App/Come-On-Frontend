import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import MeetingDashboard from './MeetingDashboard';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      dispatch: jest.fn(),
    }),
  };
});

describe('<MeetingDashboard />', () => {
  test('모임 리스트 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<MeetingDashboard />, wrapper);

    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
  });

  test('MeetingPostCreation 컴포넌트로 네비게이터 되는 버튼이 있어야 한다.', () => {
    render(<MeetingDashboard />, wrapper);

    fireEvent.press(screen.getByTestId(TestId.shared.button.icon));

    expect(mockedNavigate).toHaveBeenCalledWith('MeetingPostCreation');
  });
});
