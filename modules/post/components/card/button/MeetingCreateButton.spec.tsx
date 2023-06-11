import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import MeetingCreateButton from './MeetingCreateButton';

describe('MeetingCreateButton Compoent', () => {
  test('컴포넌트가 올바르게 렌더링 되어야 한다', () => {
    render(<MeetingCreateButton />);

    expect(screen.getByTestId(TestId.post.button.create)).toBeOnTheScreen();
  });
});
