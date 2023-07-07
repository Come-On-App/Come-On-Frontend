import { describe, expect, test } from '@jest/globals';

import { render } from '@shared/utils/customRender';
import { screen } from '@testing-library/react-native';
import createTabBarLabel from './TabBarLabel';

describe('TabBarLabel Compoent', () => {
  const labelText = 'Home';
  const LabelFont = createTabBarLabel(labelText);

  test('전달된 문자열이 올바르게 렌더링 되어야 한다.', () => {
    render(<LabelFont color="blue" focused={false} />);

    expect(screen.getByText(labelText)).toBeOnTheScreen();
  });

  test('focused 속성이 주어지면 문자열이 bold로 렌더링 되어야 한다.', () => {
    render(<LabelFont color="blue" focused />);

    expect(screen.getByText(labelText)).toHaveStyle({
      color: 'blue',
      fontFamily: 'Pretendard-SemiBold',
    });
  });
});
