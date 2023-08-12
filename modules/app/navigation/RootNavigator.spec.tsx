import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import { mockUserAuthToken } from '@account/mocks/mockAuth';
import store from '@app/redux/store';
import QueryClientProvider from '@shared/provider/QueryClientProvider';
import RootNavigation from './RootNavigation';

describe('<RootNavigator />', () => {
  test('앱이 처음 실행될 때 로그인 네비게이터가 활성화되어야 한다.', async () => {
    render(<RootNavigation />);

    expect(await screen.findByTestId(TestId.account.signin)).toBeOnTheScreen();
  });

  test('로그인이 실패한다면 올바른 에러 문구를 렌더링 해야 한다.', () => {
    const message = '로그인에 실패했습니다. 다시 시도해 주세요.';
    const Component = (
      <QueryClientProvider>
        <RootNavigation />
      </QueryClientProvider>
    );

    render(Component);

    // 로그인 실패 재연
    store.dispatch({
      payload: true,
      type: 'auth/updateErrorStatus',
    });

    expect(screen.getByText(message)).toBeOnTheScreen();
  });

  test('로그인이 올바르게 진행된다면 홈 네비게이터로 이동하여 첫 번째 하단 네비게이터가 활성화되어야 한다.', async () => {
    const Component = (
      <QueryClientProvider>
        <RootNavigation />
      </QueryClientProvider>
    );

    render(Component);

    // 로그인 성공 재연
    store.dispatch({
      payload: mockUserAuthToken,
      type: 'auth/updateUserToken',
    });

    const FirstBottomTab = await screen.findByRole('button', {
      selected: true,
    });

    expect(await screen.findByTestId(TestId.post.list)).toBeOnTheScreen();

    expect(FirstBottomTab).toBeTruthy();
  });
});
