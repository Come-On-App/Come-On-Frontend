import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import _ from 'lodash';

import TestId from '@shared/constants/testIds';
import { wrapper } from '@shared/components/ThemeProvider';
import CardList from './CardList';
import { CardInfo } from '../card/type';

const testCase: CardInfo[] = _.range(4).map(() => ({
  uri: 'path',
  people: 30,
  isDecided: false,
  title: '물개들의 모임',
  subTitle: {
    userName: '여행마스터',
    range: {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    },
  },
}));

describe('CardList Compoent', () => {
  test('요소의 개수만큼 올바르게 렌더링 되어야 한다.', () => {
    render(<CardList payloads={testCase} />, wrapper);

    expect(screen.getByTestId(TestId.post.cardList)).toBeOnTheScreen();
    expect(screen.getAllByTestId(TestId.post.card)).toHaveLength(4);
  });
});
