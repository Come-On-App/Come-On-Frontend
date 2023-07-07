import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import QueryClientProvider from '@shared/provider/QueryClientProvider';
import RootNavigation from './RootNavigation';

describe('<RootNavigatro />', () => {
  const Component = (
    <QueryClientProvider>
      <RootNavigation />
    </QueryClientProvider>
  );

  test('최초에 앱이 실행되면 첫 번째 하단 네비게이터가 활성화돼야 한다.', async () => {
    render(Component, wrapper);

    const FirstBottomTab = await screen.findByRole('button', {
      selected: true,
    });

    expect(await screen.findByTestId(TestId.post.list)).toBeOnTheScreen();
    expect(FirstBottomTab).toBeTruthy();
  });
});
