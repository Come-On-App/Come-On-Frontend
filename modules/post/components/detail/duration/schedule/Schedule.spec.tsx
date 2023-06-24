import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import Schedule from './Schedule';

describe('Schedule Compoent', () => {
  test('날짜가 확정되지 않으면 관련 날짜 범위와 관련된 텍스트를 렌더링 되어야 한다.', () => {
    const range = {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    };

    render(<Schedule range={range} isFixed={false} />);

    expect(
      screen.getByText('2022년 06월 10일 ~ 2022년 06월 20일'),
    ).toBeOnTheScreen();

    expect(
      screen.getByText('참석 가능 날짜에 투표해 보세요!'),
    ).toBeOnTheScreen();
  });

  test('날짜가 확정된다면 관련 날짜 범위와 관련된 텍스트를 렌더링 되어야 한다.', () => {
    const range = {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    };

    render(<Schedule range={range} isFixed={false} />);

    expect(screen.getByText('2022년 06월 10일')).toBeOnTheScreen();

    expect(screen.getByText('날짜가 확정되었습니다!')).toBeOnTheScreen();
  });
});
