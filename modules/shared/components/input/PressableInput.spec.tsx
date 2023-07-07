import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';

import PressableInput from './PressableInput';
import { wrapper } from '../../utils/customRender';
import { Iicon } from '../icon/type';

describe('PressableInput Compoent', () => {
  const text = 'apple';

  test('텍스트가 올바르게 렌더링 되어야 한다.', () => {
    render(<PressableInput text={text} />, wrapper);

    expect(screen.getByText('apple')).toBeOnTheScreen();
  });

  test('아이콘 속성을 전달하면 아이콘을 올바르게 렌더링 해야한다.', () => {
    const icon: Iicon = {
      name: 'date-range',
      color: 'red',
      size: 10,
    };

    render(<PressableInput text={text} icon={icon} />, wrapper);

    expect(screen.getByTestId('RNE__ICON')).toBeOnTheScreen();
  });

  test('컴포넌트를 누르면 액션을 발생해야 한다.', () => {
    const onPrsssHandler = jest.fn();

    render(<PressableInput text={text} onPress={onPrsssHandler} />, wrapper);

    fireEvent.press(screen.getByText('apple'));

    expect(onPrsssHandler).toHaveBeenCalled();
  });
});
