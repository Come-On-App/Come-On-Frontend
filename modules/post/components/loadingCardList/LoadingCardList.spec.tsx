import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import LoadingCardList from './LoadingCardList';

describe('LoadingCardList Compoent', () => {
  test('스켈레톤 UI를 올바르게 렌더링 해야 한다.', () => {
    render(<LoadingCardList />);

    expect(screen.getAllByTestId(TestId.post.skeleton)).toHaveLength(4);
  });
});
