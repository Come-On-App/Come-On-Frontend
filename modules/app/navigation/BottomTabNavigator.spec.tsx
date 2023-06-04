import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import BottomTabNavigator from './BottomTabNavigator';
import { Tab } from './config';

describe('<BottomTabNavigator />', () => {
  test('첫 번째 하단 네비게이터는 모임 리스트 컴포넌트가 렌더링 되어야 한다.', () => {
    const Navigation = (
      <NavigationContainer>
        <BottomTabNavigator initialRouteName={Tab.one} />
      </NavigationContainer>
    );

    render(Navigation);

    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
  });

  test('두 번째 하단 네비게이터는 모임 입장 컴포넌트가 렌더링 되어야 한다.', () => {
    const Navigation = (
      <NavigationContainer>
        <BottomTabNavigator initialRouteName={Tab.two} />
      </NavigationContainer>
    );

    render(Navigation);

    const Component = screen.getByTestId(TestId.userConnection.code);

    expect(Component).toBeOnTheScreen();
  });

  test('세 번째 하단 네비게이터는 마이페이지 컴포넌트가 렌더링 되어야 한다.', () => {
    const Navigation = (
      <NavigationContainer>
        <BottomTabNavigator initialRouteName={Tab.three} />
      </NavigationContainer>
    );

    render(Navigation);

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeOnTheScreen();
  });
});
