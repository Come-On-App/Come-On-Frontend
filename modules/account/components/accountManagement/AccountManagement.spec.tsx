import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/components/ThemeProvider';
import AccountManagement from './AccountManagement';

describe('AccountManagement Compoent', () => {
  test('로그아웃 옵션에 관련된 구성이 올바르레 렌더링 되어야 한다.', () => {
    render(<AccountManagement />);

    expect(screen.getByText('로그아웃')).toBeOnTheScreen();
    expect(screen.getByText('회원탈퇴')).toBeOnTheScreen();
  });
});
