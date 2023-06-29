import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/components/ThemeProvider';
import MyPage from './MyPage';

describe('<MyPage />', () => {
  test('renders MyPage message on the screen', () => {
    render(<MyPage />);

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeOnTheScreen();
  });
});
