import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import Avatar, { BadgedAvatar } from './Avatar';
import { wrapper } from '../../utils/customRender';

describe('Avatar Component', () => {
  test('주어진 속성으로 올바르게 렌더링 해야한다.', () => {
    const uri = 'https://image...';

    render(<Avatar path={uri} />, wrapper);

    expect(screen.getByTestId('RNE__Avatar__Image')).toHaveProp('source', {
      uri,
    });
  });
});

describe('BadgedAvatar Component', () => {
  test('뱃지 아이콘이 렌더링 되어야 한다.', () => {
    const uri = 'https://image...';

    render(<BadgedAvatar badgeName="photo-camera" path={uri} />, wrapper);

    expect(screen.getByTestId(TestId.shared.avatar.badge)).toBeOnTheScreen();
  });
});
