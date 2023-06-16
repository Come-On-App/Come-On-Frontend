import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import IconButton from './IconButton';

describe('IconButton Compoent', () => {
  test('버튼을 눌렀을 때 핸들러가 올바르게 동작해야 한다.', () => {
    const mockOnPress = jest.fn();

    render(
      <IconButton onPress={mockOnPress} color="black" name="10k" size={10} />,
    );

    const Button = screen.getByTestId(TestId.shared.button.icon);

    fireEvent.press(Button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('누른 상태일때 특정 스타일을 적용해야 한다.', () => {
    render(
      <IconButton
        onPress={jest.fn()}
        color="red"
        size={30}
        name="check"
        _pressed
      />,
    );

    const Button = screen.getByTestId(TestId.shared.button.icon);

    fireEvent.press(Button);

    expect(Button).toHaveStyle({
      borderRadius: 30,
      opacity: 0.3,
    });
  });
});
