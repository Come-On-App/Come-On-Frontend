import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import QueryClientProvider from '@shared/provider/QueryClientProvider';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import MyPageNavigator from './AccountNavigator';

describe('<MyPageNavigator />', () => {
  test('렌더링 시 마이페이지 컴포넌트가 표시된다.', () => {
    const Navigation = (
      <QueryClientProvider>
        <NavigationContainer>
          <MyPageNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    );

    render(Navigation);

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeOnTheScreen();
  });
});
