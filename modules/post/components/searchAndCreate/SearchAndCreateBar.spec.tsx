import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import SearchAndCreateBar from './SearchAndCreateBar';

describe('SearchAndCreateBar Compoent', () => {
  test('검색 바와 모임 생성 버튼이 올바르게 렌더링 되어야 한다.', () => {
    render(<SearchAndCreateBar />, wrapper);

    expect(screen.getByTestId(TestId.post.button.create)).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.button.searchBar)).toBeOnTheScreen();
  });
});
