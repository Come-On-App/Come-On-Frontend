import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import QueryClientProvider from '@shared/provider/QueryClientProvider';
import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import MeetingPostReport from './MeetingPostReportForm';

describe('MeetingPostReport Compoent', () => {
  const mockedGoBack = jest.fn();
  const Component = (
    <NavigationContainer>
      <QueryClientProvider>
        <MeetingPostReport
          navigation={
            {
              goBack: mockedGoBack,
            } as any
          }
          route={{ params: { id: 0 } } as any}
        />
      </QueryClientProvider>
    </NavigationContainer>
  );

  test('게시물 신고 컴포넌트가 렌더링 되어야 한다.', () => {
    render(Component);

    expect(screen.getByTestId(TestId.post.report)).toBeOnTheScreen();
  });

  test('초기 상태에는 버튼이 Disabled 처리가 되어야 한다.', () => {
    render(Component);

    expect(
      screen.getByRole('button', {
        name: '모임 신고하기',
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

  test('신고 제목과 신고 내용이 입력되었을 때, 신고 버튼이 활성화되어야 한다.', async () => {
    const PLACEHOLDER1 = '제목을 입력해 주세요.';
    const PLACEHOLDER2 = '신고가 접수되면 자동으로 모임에서 제외됩니다.';

    render(Component);

    fireEvent.changeText(screen.getByPlaceholderText(PLACEHOLDER1), 'title');
    fireEvent.changeText(screen.getByPlaceholderText(PLACEHOLDER2), 'content');

    const SubmitButton = screen.getByRole('button', {
      name: '모임 신고하기',
    });

    expect(SubmitButton).toBeEnabled();

    fireEvent.press(SubmitButton);

    expect(await screen.findByText('모임 신고중...')).toBeOnTheScreen();
  });
});
