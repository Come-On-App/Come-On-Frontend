import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import QueryClientProvider from '@shared/provider/QueryClientProvider';
import MeetingPostCreator from './MeetingPostCreator';

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

describe('MeetingPostCreator Compoent', () => {
  const Component = (
    <QueryClientProvider>
      <MeetingPostCreator />
    </QueryClientProvider>
  );

  test('모임 생성 컴포넌트가 렌더링 되어야 한다.', () => {
    render(Component);

    expect(screen.getByTestId(TestId.post.creator)).toBeOnTheScreen();
  });

  test('초기 상태에는 버튼이 Disabled 처리가 되어야 한다.', () => {
    render(Component);

    expect(
      screen.getByRole('button', {
        name: '생성',
      }),
    ).toBeDisabled();
  });

  test('취소 버튼을 클릭하면 goBack 함수가 호출되어야 한다.s', () => {
    render(Component);

    const CancelButton = screen.getByRole('button', {
      name: '취소',
    });

    fireEvent.press(CancelButton);

    expect(mockedGoBack).toBeCalled();
  });
});
