import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import MyPageNavigator from './MyPageNavigator';

describe('<MyPageNavigator />', () => {
  test('첫 진입점은 마이페이지 컴포넌트를 렌더링한다.', () => {
    const Navigation = (
      <NavigationContainer>
        <MyPageNavigator />
      </NavigationContainer>
    );

    render(Navigation);

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeDefined();
    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MyPage');
  });
});
