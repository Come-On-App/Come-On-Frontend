import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import JoinMeeting from './JoinMeeting';

describe('<JoinMeeting />', () => {
  test('모임 입장 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<JoinMeeting />);

    const Component = screen.getByTestId(TestId.join.Meeting);

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('JoinMeeting');
  });
});
