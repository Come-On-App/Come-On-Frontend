import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import Map from './Map';

describe('Map Compoent', () => {
  test('지도가 화면에 올바르게 렌더링 되어야 한다.', () => {
    render(<Map />);

    expect(screen.getByTestId(TestId.post.map)).toBeOnTheScreen();
  });
});
