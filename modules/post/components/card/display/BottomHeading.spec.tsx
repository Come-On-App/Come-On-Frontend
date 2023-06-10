import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import BottomHeading from './BottomHeading';

describe('BottomHeading Compoent', () => {
  test('주어진 속성으로 올바르게 렌더링 되어야 한다.', () => {
    const title = '우리들의 모임';
    const subTitle = {
      userName: '여행마스터',
      range: {
        startFrom: '2023-06-10',
        endTo: '2023-06-20',
      },
    };

    render(<BottomHeading title={title} subTitle={subTitle} />, wrapper);

    expect(screen.getByText('우리들의 모임')).toBeOnTheScreen();
    expect(screen.getByText('여행마스터')).toBeOnTheScreen();
    expect(screen.getByText('2023.06.10 ~ 2023.06.20')).toBeOnTheScreen();
  });
});
