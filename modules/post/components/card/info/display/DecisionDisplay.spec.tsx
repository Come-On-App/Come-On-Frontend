import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import DecisionDisplay from './DecisionDisplay';

describe('DecisionDisplay Compoent', () => {
  test('isDecided 속성에 맞게 올바른 텍스트를 렌더링 해야 한다.', () => {
    render(<DecisionDisplay isDecided />, wrapper);

    const Component = screen.getByRole('text');

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('확정');

    render(<DecisionDisplay isDecided={false} />, wrapper);

    const Component2 = screen.getByRole('text');

    expect(Component2).toBeOnTheScreen();
    expect(Component2).toHaveTextContent('미확정');
  });
});
