import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/components/ThemeProvider';
import Card from './Card';

describe('card Compoent', () => {
  test('전달된 속성으로 카드 구성 요소를 렌더링 해야 한다.', () => {
    const payload = {
      uri: '...png',
      people: 30,
      isDecided: true,
      title: '물개들의 모임',
      subTitle: {
        userName: '여행마스터',
        range: {
          startFrom: '2023-06-10',
          endTo: '2023-06-20',
        },
      },
    };

    render(<Card payload={payload} />, wrapper);

    expect(screen.getByTestId('RNE__Image')).toBeOnTheScreen();
    expect(screen.getByText('30명')).toBeOnTheScreen();
    expect(screen.getByText('확정')).toBeOnTheScreen();
    expect(screen.getByText('물개들의 모임')).toBeOnTheScreen();
    expect(screen.getByText('여행마스터')).toBeOnTheScreen();
    expect(screen.getByText('2023.06.10 ~ 2023.06.20')).toBeOnTheScreen();
  });
});
