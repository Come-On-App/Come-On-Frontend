import { describe, expect, test, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TimePickerButton from './TimePickerButton';

describe('TimePickerButton Compoent', () => {
  test('Date 객체를 전달하면 화면에 오전/오후 시간 형태로 렌더링 되어야 한다.', () => {
    const time = '06:00:00';

    render(<TimePickerButton time={time} />);

    expect(screen.getByText('오전 6:00')).toBeOnTheScreen();
  });
});
