import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import { mockUserAvatarImage } from '@account/mocks/mockUserAvatarImage';
import UserAvatar from './UserAvatar';

describe('UserAvatar Compoent', () => {
  test('사용자 아바타 컴포펀트가 올바르게 렌더링 되어야 한다.', () => {
    render(<UserAvatar path={mockUserAvatarImage} />);

    expect(screen.getByTestId(TestId.account.avatar)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.shared.avatar.badge)).toBeOnTheScreen();
  });

  test.todo('아바타를 클릭하면 이벤트가 올바르게 발생해야 한다.');
});
