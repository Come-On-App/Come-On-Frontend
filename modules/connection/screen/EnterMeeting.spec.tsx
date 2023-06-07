import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import MeetingCode from './MeetingCode';

describe('<MeetingCode />', () => {
  test('모임 입장 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<MeetingCode />);

    const Component = screen.getByTestId(TestId.connection.code);

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MeetingCode');
  });
});
