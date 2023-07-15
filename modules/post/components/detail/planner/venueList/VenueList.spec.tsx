import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import mockVenueList from '@post/mocks/venueList';
import VenueList from './VenueList';

describe('VenueList Compoent', () => {
  test('요소의 개수만큼 올바르게 렌더링 되어야 한다.', () => {
    render(<VenueList data={mockVenueList} />, wrapper);

    expect(screen.getByTestId(TestId.post.venueList)).toBeOnTheScreen();

    expect(screen.getAllByTestId(TestId.post.venue)).toHaveLength(4);
  });
});
