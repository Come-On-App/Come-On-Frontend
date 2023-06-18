import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import MeetingPostCreator from './MeetingPostCreator';

describe('MeetingPostCreator Compoent', () => {
  test('모임 생성 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<MeetingPostCreator />, wrapper);

    expect(screen.getByTestId(TestId.post.creator)).toBeOnTheScreen();
  });
});
