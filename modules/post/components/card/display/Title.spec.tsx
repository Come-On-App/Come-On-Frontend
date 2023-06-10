import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import Title from './Title';

describe('Title Compoent', () => {
  test('텍스트를 전달하면 올바르게 렌더링 되어야 한다.', () => {
    const TEXT = 'TITLE';

    render(<Title text={TEXT} />, wrapper);

    expect(screen.getByText(TEXT)).toBeOnTheScreen();
  });
});
