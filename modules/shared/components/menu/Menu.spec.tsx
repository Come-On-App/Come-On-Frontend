import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import Menu from './Menu';

describe('Menu Compoent', () => {
  const MenuName = 'Show menu';

  test('전달된 컴포넌트를 클릭하면 메뉴의 요소가 올바르게 보여줘야 한다.', async () => {
    render(
      <Menu
        anchor={<Text>{MenuName}</Text>}
        list={[
          {
            name: 'Menu Item 1',
            onPress: jest.fn,
          },
        ]}
      />,
    );

    const Component = await screen.findByText(MenuName);

    fireEvent.press(Component);

    expect(Component).toBeOnTheScreen();
    expect(Component).toBeVisible();
  });
});
