import { describe, expect, test, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import MeetingCreateButton from './MeetingCreateButton';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe('MeetingCreateButton Compoent', () => {
  test('컴포넌트가 올바르게 렌더링 되어야 한다', () => {
    render(<MeetingCreateButton />, wrapper);

    expect(screen.getByTestId(TestId.post.button.create)).toBeOnTheScreen();
  });
});
