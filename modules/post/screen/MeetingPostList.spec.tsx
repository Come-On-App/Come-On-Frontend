import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import MeetingPostList from './MeetingPostList';

describe('<MeetingPostList />', () => {
  test('모임 리스트 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<MeetingPostList />);

    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MeetingPostList');
  });
});
