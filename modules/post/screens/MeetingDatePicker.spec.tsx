// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import MeetingDatePicker from './MeetingDatePicker';

describe('MeetingDatePicker Compoent', () => {
  test('모임 날짜 범위 컴포넌트가 렌더링 되어야 한다. ', () => {
    render(
      <MeetingDatePicker route={{ params: { payloadType: 'creator' } }} />,
      wrapper,
    );

    expect(screen.getByTestId(TestId.post.dateSelector)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.shared.calender)).toBeOnTheScreen();
  });
});
