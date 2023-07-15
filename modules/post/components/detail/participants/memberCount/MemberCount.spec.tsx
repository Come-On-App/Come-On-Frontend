import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import MemberCount from './MemberCount';

describe('MemberCount Compoent', () => {
  test('멤버의 인원수만큼 개수를 렌더링 해야 한다.', () => {
    render(<MemberCount headcount={13} />, wrapper);

    expect(screen.getByText('13')).toBeOnTheScreen();
  });
});
