import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import GroupDisplay from './GroupDisplay';

describe('GroupDisplay Compoent', () => {
  test('인원수에 맞게 올바르게 렌더링 해야 한다.', () => {
    const peopleCount = 20;

    render(<GroupDisplay people={peopleCount} />, wrapper);

    const Component = screen.getByRole('text');

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('20명');
  });
});
