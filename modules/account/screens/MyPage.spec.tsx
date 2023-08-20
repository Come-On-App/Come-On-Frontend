import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import QueryClientProvider from '@shared/provider/QueryClientProvider';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import MyPage from './MyPage';

describe('<MyPage />', () => {
  test('renders MyPage message on the screen', () => {
    render(
      <QueryClientProvider>
        <MyPage />
      </QueryClientProvider>,
    );

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeOnTheScreen();
  });
});
