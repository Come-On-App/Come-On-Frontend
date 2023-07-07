import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import MeetingDatePicker from './MeetingDatePicker';

describe('MeetingDatePicker Compoent', () => {
  test('모임 날짜 범위 컴포넌트가 렌더링 되어야 한다. ', () => {
    render(<MeetingDatePicker />, wrapper);

    expect(screen.getByTestId(TestId.post.dateSelector)).toBeOnTheScreen();
  });
});
