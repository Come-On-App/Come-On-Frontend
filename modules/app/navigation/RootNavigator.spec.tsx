import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import RootNavigation from './RootNavigation';

describe('<RootNavigatro />', () => {
  test('최초에 앱이 실행되면 첫 번째 하단 네비게이터가 활성화돼야 한다.', () => {
    render(<RootNavigation />, wrapper);

    const FirstBottomTab = screen.getByRole('button', {
      selected: true,
    });
    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
    expect(FirstBottomTab).toBeTruthy();
  });
});
