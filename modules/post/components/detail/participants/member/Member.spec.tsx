import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import Members from './Member';

const mockUser = {
  nickname: 'name01',
  profileImageUrl: 'https://picsum.photos/200/300',
};

describe('Members Compoent', () => {
  test('사용자의 프로필 이미지와 닉네임이 올바르게 렌더링 되어야 한다.', () => {
    render(
      <Members
        nickname={mockUser.nickname}
        profileImageUrl={mockUser.profileImageUrl}
      />,
      wrapper,
    );

    expect(screen.getByTestId('RNE__Avatar__Image')).toBeOnTheScreen();
  });
});
