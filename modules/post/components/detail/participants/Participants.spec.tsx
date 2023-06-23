import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import mockMembers from '@post/mocks/members';
import { wrapper } from '@shared/components/ThemeProvider';
import Participants from './participants';

describe('Participants Compoent', () => {
  test('멤버와 관련된 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(<Participants users={mockMembers} />, wrapper);

    expect(screen.getByText('모임 멤버')).toBeOnTheScreen();

    expect(screen.getByText('12')).toBeOnTheScreen();

    expect(screen.getAllByTestId('RNE__Avatar__Image')).toHaveLength(12);

    mockMembers.forEach(({ nickname }) => {
      expect(screen.getByText(nickname)).toBeOnTheScreen();
    });
  });
});
