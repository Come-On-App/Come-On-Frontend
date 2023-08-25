import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import TimePickerButton from './TimePickerButton';

describe('TimePickerButton Compoent', () => {
  const time = '06:00:00';
  const expected = '오전 6:00';

  test('문자열을 전달하면 화면에 오전/오후 시간 형태로 렌더링 되어야 한다.', () => {
    render(<TimePickerButton time={time} isHost={false} id={0} />, wrapper);

    expect(screen.getByText(expected)).toBeOnTheScreen();
  });

  test('일반 사용자는 버튼이 비활성화 되어야 한다.', () => {
    render(<TimePickerButton time={time} isHost={false} id={0} />, wrapper);

    expect(
      screen.getByAccessibilityHint('TimePickerButtonContainer'),
    ).toBeDisabled();
  });
});
