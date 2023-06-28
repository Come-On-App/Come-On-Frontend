import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import EnterMeeting from './EnterMeeting';

describe('<EnterMeeting />', () => {
  test('모임 입장 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<EnterMeeting />, wrapper);

    expect(screen.getByTestId(TestId.connection.code)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.shared.logo)).toBeOnTheScreen();
    expect(
      screen.getByText('공유 받은 입장 코드를 입력해 주세요'),
    ).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.connection.codeField)).toBeOnTheScreen();
    expect(
      screen.getByRole('button', {
        name: '입장하기',
      }),
    ).toBeOnTheScreen();
  });
});
