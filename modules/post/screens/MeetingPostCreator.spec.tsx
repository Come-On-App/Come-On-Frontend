import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import QueryClientProvider from '@shared/provider/QueryClientProvider';
import MeetingPostCreator from './MeetingPostCreator';

describe('MeetingPostCreator Compoent', () => {
  const mockedGoBack = jest.fn();
  const Component = (
    <NavigationContainer>
      <QueryClientProvider>
        <MeetingPostCreator
          navigation={
            {
              goBack: mockedGoBack,
            } as any
          }
          route={jest.fn() as any}
        />
      </QueryClientProvider>
    </NavigationContainer>
  );

  test('모임 생성 컴포넌트가 렌더링 되어야 한다.', () => {
    render(Component);

    expect(screen.getByTestId(TestId.post.creator)).toBeOnTheScreen();
  });

  test('초기 상태에는 버튼이 Disabled 처리가 되어야 한다.', () => {
    render(Component);

    expect(
      screen.getByRole('button', {
        name: '모임 만들기',
      }),
    ).toBeDisabled();
  });

  test('취소 버튼을 클릭하면 goBack 함수가 호출되어야 한다.', () => {
    render(Component);

    const CancelButton = screen.getByRole('button', {
      name: '취소',
    });

    fireEvent.press(CancelButton);

    expect(mockedGoBack).toBeCalled();
  });
});
