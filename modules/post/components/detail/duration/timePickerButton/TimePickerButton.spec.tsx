import { describe, expect, test, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import TimePickerButton from './TimePickerButton';

describe('TimePickerButton Compoent', () => {
  const time = '06:00:00';
  const expected = '오전 6:00';

  test('문자열을 전달하면 화면에 오전/오후 시간 형태로 렌더링 되어야 한다.', () => {
    render(<TimePickerButton time={time} />, wrapper);

    expect(screen.getByText(expected)).toBeOnTheScreen();
  });

  test('일반 사용자는 호스트와 구분하여 시각적 차이가 나게 렌더링 되어야 한다.', () => {
    const host = true;

    render(<TimePickerButton time={time} isHost={host} />, wrapper);

    expect(
      screen.getByAccessibilityHint('TimePickerButtonContainer'),
    ).toHaveStyle({
      backgroundColor: '#BDBDBD',
    });
  });
});
