import { describe, expect, test, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import VotingTimeRangePicker from './VotingTimeRangePicker';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('VotingTimeRangePicker Compoent', () => {
  test('타이틀과 투표 버튼 컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(<VotingTimeRangePicker />, wrapper);

    expect(screen.getByText('투표 기간')).toBeOnTheScreen();
    expect(screen.getByText('날짜 범위를 선택해 주세요')).toBeOnTheScreen();
  });

  test('MeetingDateSelector 컴포넌트로 네비게이터 되는 버튼이 있어야 한다.', () => {
    render(<VotingTimeRangePicker />, wrapper);

    fireEvent.press(screen.getByText('날짜 범위를 선택해 주세요'));

    expect(mockedNavigate).toHaveBeenCalledWith('MeetingDateSelector');
  });
});
