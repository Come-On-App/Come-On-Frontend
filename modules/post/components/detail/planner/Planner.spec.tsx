import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import TestId from '@shared/constants/testIds';
import mockVenueList from '@post/mocks/venueList';
import { render } from '@shared/utils/customRender';
import Planner from './Planner';

describe('Planner Compoent', () => {
  test('장소와 관련된 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(
      <NavigationContainer>
        <Planner venueList={mockVenueList} />
      </NavigationContainer>,
    );

    expect(screen.getByTestId(TestId.post.venueList)).toBeOnTheScreen();
    expect(screen.getAllByTestId(TestId.post.venue)).toHaveLength(4);
    expect(screen.getByTestId(TestId.post.button.addVenue)).toBeOnTheScreen();
  });
});
