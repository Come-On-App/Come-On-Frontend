import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import MeetingDashboard from './MeetingDashboard';

describe('<MeetingDashboard />', () => {
  test('모임 리스트 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<MeetingDashboard />, wrapper);

    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
  });
});
