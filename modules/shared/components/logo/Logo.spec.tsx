import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import Logo from './Logo';

describe('Logo Compoent', () => {
  test('로고가 올바르게 렌더링 되야 한다', () => {
    render(<Logo />);

    expect(screen.queryByTestId(TestId.shared.logo.defulat)).toBeOnTheScreen();
  });
});
