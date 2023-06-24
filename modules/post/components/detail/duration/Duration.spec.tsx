import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { renderWithThemeProvider as render } from '@shared/components/ThemeProvider';

import Duration from './Duration';
import { Iduration } from './type';

describe('Duration Compoent', () => {
  test('모임 기간과 관련된 정보가 올바르게 렌더링 되어야 한다.', () => {
    const { range, time }: Iduration = {
      range: {
        range: { startFrom: '2023-06-10', endTo: '2023-06-20' },
        isFixed: false,
      },
      time: {
        time: '06:00:00',
        isHost: false,
      },
    };

    render(<Duration range={range} time={time} />);

    expect(
      screen.getByText('2023년 06월 10일 ~ 2023년 06월 20일'),
    ).toBeOnTheScreen();

    expect(
      screen.getByText('참석 가능 날짜에 투표해 보세요!'),
    ).toBeOnTheScreen();

    expect(screen.getByText('오전 6:00')).toBeOnTheScreen();
  });
});
