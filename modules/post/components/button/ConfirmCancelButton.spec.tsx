import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import ConfirmCancelButton from './ConfirmCancelButton';

describe('ConfirmCancelButton Compoent', () => {
  test('두 개의 버튼 컴포넌트가 렌더링 되어야 한다.', () => {
    render(<ConfirmCancelButton />, wrapper);

    expect(screen.getAllByTestId(TestId.shared.button.default)).toHaveLength(2);
  });
});
