import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import PostNavigator from './PostNavigator';

describe('<PostNavigator />', () => {
  test('렌더링 시 초기 라우터는 모임 리스트 컴포넌트를 렌더링 해야 한다.', () => {
    const Navigation = (
      <NavigationContainer>
        <PostNavigator />
      </NavigationContainer>
    );

    render(Navigation, wrapper);

    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
  });
});
