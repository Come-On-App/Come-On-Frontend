import { describe, expect, test, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react-native';

import Button from './Button';
import { wrapper } from '../ThemeProvider';

describe('Button Compoent', () => {
  test('버튼을 눌렀을 때 핸들러가 올바르게 동작해야 한다.', () => {
    const mockOnPress = jest.fn();

    render(<Button onPress={mockOnPress} title="btn1" />, wrapper);

    const Component = screen.getByRole('button', { name: 'btn1' });

    fireEvent.press(Component);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
