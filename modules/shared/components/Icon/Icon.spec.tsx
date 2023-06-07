import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import Icon from './Icon';
import { IconProps } from './type';

describe('Icon Component', () => {
  test('주어진 속성으로 올바르게 렌더링 해야한다.', () => {
    const { name, color, size } = {
      name: 'check',
      color: 'blue',
      size: 30,
    } as IconProps;

    render(<Icon size={size} name={name} color={color} />);

    const Component = screen.getByTestId('RNE__ICON');

    expect(Component).toBeOnTheScreen();
  });
});
