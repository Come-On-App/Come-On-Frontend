import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/components/ThemeProvider';
import WelcomeMessage from './WelcomeMessage';

describe('WelcomeMessage Compoent', () => {
  test('환영 문구가 올바르게 렌더링 되어야 한다', () => {
    render(<WelcomeMessage userName="Apple" />);

    expect(screen.getByText('환영합니다. Apple님!')).toBeOnTheScreen();
  });
});
