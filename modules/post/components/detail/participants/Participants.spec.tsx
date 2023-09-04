import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { postMembers } from '@post/mocks/members';
import { render } from '@shared/utils/customRender';
import store from '@app/redux/store';
import { updateCurrentPostId } from '@post/features/detail/detailSlice';
import ParticipantCard from './Participants';

describe('Participants Compoent', () => {
  const POST_ID = 3;

  test('멤버와 관련된 정보가 올바르게 렌더링 되어야 한다.', async () => {
    // 특정 게시물 ID 구현
    store.dispatch(updateCurrentPostId(POST_ID));

    render(<ParticipantCard />);

    expect(screen.getByText('모임 멤버')).toBeOnTheScreen();

    expect(
      await screen.findByText('5', {}, { timeout: 2000 }),
    ).toBeOnTheScreen();

    expect(screen.getAllByTestId('RNE__Avatar__Image')).toHaveLength(5);

    postMembers[POST_ID].contents.forEach(({ nickname }) => {
      expect(screen.getByText(nickname)).toBeOnTheScreen();
    });
  });
});
