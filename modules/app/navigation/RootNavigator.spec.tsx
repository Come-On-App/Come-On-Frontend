import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import RootNavigation from './RootNavigation';

describe('<RootNavigatro />', () => {
  test('최초에 앱이 실행되면 모임 게시물 리스트 라우터가 활성화 되어야 한다.', () => {
    render(<RootNavigation />);

    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MeetingPostList');
  });
});
