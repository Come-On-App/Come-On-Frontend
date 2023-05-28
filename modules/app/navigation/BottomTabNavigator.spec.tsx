import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import BottomTabNavigator from './BottomTabNavigator';

describe('<BottomTabNavigator />', () => {
  test('렌더링이 완료되면 첫 번째 하단 네비게이터가 렌더링 된다.', () => {
    const Navigation = (
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    );

    render(Navigation);

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeDefined();
    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MyPage');
  });
});
