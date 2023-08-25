import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { render } from '@shared/utils/customRender';

import Duration from './Duration';

describe('Duration Compoent', () => {
  test('모임 기간과 관련된 정보가 올바르게 렌더링 되어야 한다.', async () => {
    render(<Duration id={0} />);

    expect(
      await screen.findByText('2023년 07월 01일 ~ 2023년 07월 31일', {
        timeout: 4000,
      }),
    ).toBeOnTheScreen();

    expect(
      screen.getByText('참석 가능 날짜에 투표해 보세요!'),
    ).toBeOnTheScreen();

    expect(screen.getByText('오전 11:00')).toBeOnTheScreen();
  });
});
