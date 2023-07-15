import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import Skeleton from './Skeleton';

describe('Skeleton Compoent', () => {
  test('요소가 올바르게 렌더링 되어야 한다.', () => {
    render(<Skeleton />);

    expect(screen.getByTestId(TestId.post.skeleton)).toBeOnTheScreen();
  });
});
