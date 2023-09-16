import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import store from '@app/redux/store';
import { NavigationContainer } from '@react-navigation/native';

import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import { updateCurrentPostId } from '@post/features/detail/detailSlice';
import VenueList from './VenueList';

describe('VenueList Compoent', () => {
  test('요소의 개수만큼 올바르게 렌더링 되어야 한다.', async () => {
    // 특정 게시물 재현
    store.dispatch(updateCurrentPostId(1));

    render(
      <NavigationContainer>
        <VenueList />
      </NavigationContainer>,
    );

    expect(
      await screen.findByTestId(TestId.post.venueList, { timeout: 1200 }),
    ).toBeOnTheScreen();

    expect(screen.getAllByTestId(TestId.post.venue)).toHaveLength(1);
  });
});
