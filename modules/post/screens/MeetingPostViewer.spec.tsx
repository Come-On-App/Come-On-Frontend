import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import MeetingPostViewer from './MeetingPostViewer';

describe('MeetingPostViewer Compoent', () => {
  test('모임 상세 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(<MeetingPostViewer />, wrapper);

    expect(screen.getByText('모임 멤버')).toBeOnTheScreen();
    expect(screen.getByText('모임 기간')).toBeOnTheScreen();
    expect(screen.getByText('모임 장소')).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.detail)).toBeOnTheScreen();
  });
});
