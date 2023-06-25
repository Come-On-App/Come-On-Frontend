import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import mockVenueList from '@post/mocks/venueList';
import Venue from './Venue';

describe('Venue Compoent', () => {
  const venue = mockVenueList[0];

  test('장소 순서와 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(<Venue info={venue.info} order={venue.order} />, wrapper);

    expect(screen.getByTestId(TestId.post.noteCard)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.order)).toBeOnTheScreen();
  });
});
