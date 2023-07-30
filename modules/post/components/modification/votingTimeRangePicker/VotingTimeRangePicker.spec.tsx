import { describe, expect, test, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import { convertDateRangeToDateInfo } from '@shared/utils';
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
    render(
      <VotingTimeRangePicker
        isLoad
        prevRange={{ endTo: null, startFrom: null }}
      />,
      wrapper,
    );

    expect(screen.getByText('투표 기간 수정')).toBeOnTheScreen();
    expect(screen.getByText('날짜 범위 불러오는중...')).toBeOnTheScreen();
  });

  test('MeetingDateSelector 컴포넌트로 네비게이터 되는 버튼이 있어야 한다.', () => {
    render(
      <VotingTimeRangePicker
        isLoad={false}
        prevRange={convertDateRangeToDateInfo({
          startFrom: '2023-07-12',
          endTo: '2023-07-13',
        })}
      />,
      wrapper,
    );

    fireEvent.press(screen.getByText('2023.07.12 ~ 2023.07.13'));

    expect(mockedNavigate).toHaveBeenCalledWith('MeetingDateSelector', {
      payloadType: 'modifier',
    });
  });
});
