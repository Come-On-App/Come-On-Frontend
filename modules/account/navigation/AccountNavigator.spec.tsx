import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import MyPageNavigator from './AccountNavigator';

describe('<MyPageNavigator />', () => {
  test('렌더링 시 마이페이지 컴포넌트가 표시된다.', () => {
    const Navigation = (
      <NavigationContainer>
        <MyPageNavigator />
      </NavigationContainer>
    );

    render(Navigation);

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MyPage');
  });
});
