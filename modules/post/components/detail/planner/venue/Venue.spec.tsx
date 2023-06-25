import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import mockData from '@post/mocks/venue';
import Venue from './Venue';

describe('Venue Compoent', () => {
  test('장소 순서와 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(<Venue info={mockData.info} order={mockData.order} />, wrapper);

    expect(screen.getByTestId(TestId.post.noteCard)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.order)).toBeOnTheScreen();
  });
});
