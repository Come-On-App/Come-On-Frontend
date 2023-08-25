import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import mockMembers from '@post/mocks/members';
import { wrapper } from '@shared/utils/customRender';
import Members from './Members';

describe('Members Compoent', () => {
  test('인원수에 맞게 렌더링 되어야 한다.', () => {
    render(<Members response={mockMembers} isLoading={false} />, wrapper);

    expect(screen.getAllByTestId('RNE__Avatar__Image')).toHaveLength(4);

    ['차운우', '쏭', 'user157', 'user155'].forEach((name) => {
      expect(screen.getByText(name)).toBeOnTheScreen();
    });
  });
});
