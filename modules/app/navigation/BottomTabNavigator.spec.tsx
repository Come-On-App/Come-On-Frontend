import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import BottomTabNavigator from './BottomTabNavigator';
import { Tab } from './config';

describe('<BottomTabNavigator />', () => {
  function Navigation(routeName: Tab) {
    return (
      <NavigationContainer>
        <BottomTabNavigator initialRouteName={routeName} />
      </NavigationContainer>
    );
  }

  test('첫 번째 하단 네비게이터는 모임 리스트 컴포넌트가 렌더링 되어야 한다.', async () => {
    render(Navigation(Tab.one));

    expect(screen.getByTestId(TestId.post.list)).toBeOnTheScreen();
    expect(await screen.findByTestId(TestId.post.cardList)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.button.create)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.button.searchBar)).toBeOnTheScreen();
  });

  test('두 번째 하단 네비게이터는 모임 입장 컴포넌트가 렌더링 되어야 한다.', () => {
    render(Navigation(Tab.two));

    const Component = screen.getByTestId(TestId.connection.code);

    expect(Component).toBeOnTheScreen();
  });

  test('세 번째 하단 네비게이터는 마이페이지 컴포넌트가 렌더링 되어야 한다.', () => {
    render(Navigation(Tab.three));

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeOnTheScreen();
  });
});
