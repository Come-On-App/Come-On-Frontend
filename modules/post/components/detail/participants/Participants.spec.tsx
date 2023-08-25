import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import mockMembers from '@post/mocks/members';
import { render } from '@shared/utils/customRender';
import ParticipantCard from './Participants';

describe('Participants Compoent', () => {
  test('멤버와 관련된 정보가 올바르게 렌더링 되어야 한다.', async () => {
    render(<ParticipantCard id={0} />);

    expect(screen.getByText('모임 멤버')).toBeOnTheScreen();

    expect(await screen.findByText('4')).toBeOnTheScreen();

    expect(screen.getAllByTestId('RNE__Avatar__Image')).toHaveLength(4);

    mockMembers.contents.forEach(({ nickname }) => {
      expect(screen.getByText(nickname)).toBeOnTheScreen();
    });
  });
});
