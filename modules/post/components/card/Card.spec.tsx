import { describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import { ICardInfo } from './type';
import Card from './Card';

jest.mock('@react-navigation/native', () => {
  const actualNav: unknown[] = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('card Compoent', () => {
  const payload: ICardInfo = {
    id: 0,
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

  test('전달된 속성으로 카드 구성 요소를 렌더링 해야 한다.', () => {
    render(<Card payload={payload} />);

    expect(screen.getByTestId(TestId.post.card)).toBeOnTheScreen();
    expect(screen.getByTestId('RNE__Image')).toBeOnTheScreen();
    expect(screen.getByText('30명')).toBeOnTheScreen();
    expect(screen.getByText('확정')).toBeOnTheScreen();
    expect(screen.getByText('물개들의 모임')).toBeOnTheScreen();
    expect(screen.getByText('여행마스터')).toBeOnTheScreen();
    expect(screen.getByText('2023.06.10 ~ 2023.06.20')).toBeOnTheScreen();
  });
});
