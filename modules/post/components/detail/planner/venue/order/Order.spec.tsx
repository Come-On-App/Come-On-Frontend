import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import Order from './Order';

describe('Order Compoent', () => {
  test('순서가 올바르게 렌더링 되어야 한다.', () => {
    render(<Order order={1} />, wrapper);

    expect(screen.getByText('1')).toBeOnTheScreen();
  });
});
