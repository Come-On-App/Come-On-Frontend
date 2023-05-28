import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import MyPage from './MyPage';

describe('<MyPage />', () => {
  test('renders MyPage message on the screen', () => {
    render(<MyPage />);

    const Component = screen.getByTestId(TestId.account.myPage);

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MyPage');
  });
});
