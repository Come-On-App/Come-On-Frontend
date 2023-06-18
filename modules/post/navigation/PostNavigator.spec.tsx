import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
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

  test('모임 생성 버튼을 클릭하면 모임 생성 페이지로 네비게이터 돼야 한다.', async () => {
    const Navigation = (
      <NavigationContainer>
        <PostNavigator />
      </NavigationContainer>
    );

    render(Navigation, wrapper);

    const Button = screen.getByTestId(TestId.shared.button.icon);

    fireEvent.press(Button);

    const Screen = await screen.findByTestId(TestId.post.creator);

    expect(Screen).toBeOnTheScreen();
  });

  test('모임 생성 페이지에서 날짜 투표 컴포넌트를 클릭하면 날짜 범위 선택 스크린으로 네비게이터 돼야 한다.', async () => {
    const dateSelectorText = '날짜 범위를 선택해 주세요';
    const Navigation = (
      <NavigationContainer>
        <PostNavigator />
      </NavigationContainer>
    );

    render(Navigation, wrapper);

    fireEvent.press(screen.getByTestId(TestId.shared.button.icon));

    fireEvent.press(await screen.findByText(dateSelectorText));

    const DateSelectorScreen = await screen.findByTestId(
      TestId.post.dateSelector,
    );

    expect(DateSelectorScreen).toBeOnTheScreen();
  });
});
